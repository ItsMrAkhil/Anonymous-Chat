#Anonymous Chat

**Technologies Used**

 - React.js
 - Node.js
 - Express.js
 - Socket.io
 - MongoDB (Mongoose)

**Instructions to use**

 - Clone repo by using `git clone https://github.com/ItsMrAkhil/Anonymous-Chat.git`
 - Do `npm install` inside `Anonymous Chat` folder
 - After 2nd step do `npm start` to start the project.
 - Goto `localhost:300` in your browser.

**How it Works**

 - Whenever a new user comes. We store a `random` and `unique key` in `localstorage` of browser.
 - If he/she sends a new messge that will be sent to the server with the `uniqe key`.
 - If the user comes back again we use the `unique key` to identify whether the message is belongs to that user or not.
 - **Note**: When user deletes the `localstorage` or that `unique key` all the messages will be shown as sent by others.

**Pre-requisites**

 1. Node.js should be installed
 2. MongoDB should be installed. (Without any credential requirement. If you have credentials to access it. Please edit this `mongodb://localhost/idea-to-startup` line in `server/index.js` to your db link.)
 3. Port 300 should not be in use. (If it is in use please change the line `const port = argv.port || process.env.PORT || 3000;` to appropriate port number.)
