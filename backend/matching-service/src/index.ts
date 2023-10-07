// app.js
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { rabbitMQSetup } from './services/rabbitmq-service';
import { processQueues } from './services/rabbitmq-service';
import { setupSockets } from './sockets/socketHandler';

const PORT = process.env.MATCHING_PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your React app's URL
  }
});


server.listen(PORT, () => {
  console.log(`matching service is running on port ${PORT}`);
});

app.use(bodyParser.json());

rabbitMQSetup().then((channel) => {
  setupSockets(io, channel);
  setInterval(async () => {
    processQueues(channel);
  }, 5000)
});



