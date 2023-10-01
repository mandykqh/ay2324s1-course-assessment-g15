import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server, Socket } from 'socket.io';
import router from './router';
import { setupSockets } from './sockets/socketHandler';

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

setupSockets(io);

app.use('/', router());
