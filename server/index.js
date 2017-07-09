/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const mongoose = require('mongoose');

const Message = require('./models/Message');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/idea-to-startup', (err) => {
  if (err) {
    logger.error('Error in connecting to MongoDB');
    throw err;
  }
});

const socketActions = require('./constants');

app.use(morgan('dev'));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

app.use('/api/messages/:page', (req, res) => {
  const { page: reqPage } = req.params;
  const page = parseInt(reqPage, 10);
  Message.find({})
  .limit(10)
  .skip((page - 1) * 10)
  .sort({ createdAt: -1 })
  .lean()
  .exec((errFind, messages) => {
    if (errFind) {
      logger.error(errFind);
      return res.status(500).json({ success: false, messages: [] });
    } Message.count({}, (errCount, count) => {
      if (errCount) {
        logger.error(errCount);
        return res.status(500).json({ success: false, messages: [] });
      }
      const nextPage = page + 1;
      const totalPages = Math.ceil(count / 10);
      return res.status(200).json({ success: true, messages, totalPages, nextPage });
    });
  });
});

io.on('connection', (socket) => {
  socket.emit('action', { type: socketActions.out.SOCKET_CONNECT_SUCCESS, payload: socket.id });
  socket.on('action', ({ type, payload }) => {
    switch (type) {
      case socketActions.in.SEND_MESSAGE:
        return Message.create(payload, (err, message) => {
          if (message) {
            return io.sockets.emit('action', {
              type: socketActions.out.SEND_MESSAGE,
              payload: {
                message: payload.message,
                chatId: payload.chatId,
                createdAt: Date.now(),
              },
            });
          }
        });
      default:
        return '';
    }
  });
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
server.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
