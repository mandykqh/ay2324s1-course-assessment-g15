import { Server, Socket } from 'socket.io';
import { RoomEvents } from '../types/enums/RoomEvents';

export function setupSockets(io: Server) {
  io.on('connection', (socket: Socket) => {
    handleSocketEvents(socket);
  });
}

function handleSocketEvents(socket: Socket) {
  socket.on(RoomEvents.joinRoom, (room) => {
    socket.join(room);

    // Broadcast a message to all clients in the room when a user joins
    socket.to(room).emit(RoomEvents.userJoined, socket.id);

    socket.on(RoomEvents.codeChange, (code) => {
      // Listen for code changes from a client and broadcast them to others in the room
      socket.to(room).emit(RoomEvents.codeChange, code);
    });

    socket.on(RoomEvents.disconnect, () => {
      // Listen for disconnects and inform others in the room
      socket.to(room).emit(RoomEvents.userLeft, socket.id);
    });
  });
}
