import { Server, Socket } from 'socket.io';
import { findMatch } from './utils';
import ampq from 'amqplib';

export async function setupSockets(io: Server, channel: ampq.Channel) {
  io.on('connection', (socket: Socket) => {
    handleSocketEvents(socket, channel);
  });
}

async function handleSocketEvents(socket: Socket, channel: ampq.Channel) {
  socket.on('find_match', async (data) => {
    try {
      console.log(`Client connected: ${socket.id}`);
      findMatch(socket, channel, data);
    } catch (error) {
      console.error('Error handling socket event:', error);
    }
  });
}