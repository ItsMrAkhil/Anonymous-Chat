const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  chatId: { type: String, required: true },
}, { timestamps: true });
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
