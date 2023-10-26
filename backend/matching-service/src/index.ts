import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { rabbitMQSetup } from './services/rabbitmq-service';
import { processQueues } from './services/rabbitmq-service';
import { setupSockets } from './sockets/socketHandler';
import { Server } from "socket.io";
import cors from 'cors';

const PORT = process.env.MATCHING_PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  }
});

app.use(bodyParser.json());
app.use(cors());

server.listen(PORT, () => {
  console.log(`matching service is running on port ${PORT}`);
});

rabbitMQSetup().then((channel) => {
  setupSockets(io, channel);
  setInterval(async () => {
    processQueues(channel);
  }, 5000)
});



