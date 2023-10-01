// app.js
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import matchRoute from './router';
import { Socket } from 'socket.io';
import helmet from 'helmet';

const app = express();
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "ws://localhost:3000"], // Allow WebSocket connections to localhost
    },
  })
);
const server = http.createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());

io.on('connection', (socket:Socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Simulate sending a welcome message to the connected client
  socket.emit('message', 'Welcome to the matchmaking service!');

  // You can add more socket.io event handlers here
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/', matchRoute());
