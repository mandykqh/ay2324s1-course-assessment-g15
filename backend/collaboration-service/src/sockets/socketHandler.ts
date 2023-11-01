import { Server, Socket } from 'socket.io';
import { RoomEvents } from '../types/enums/RoomEvents';
import { getQuestions } from '../../../matching-service/src/api/QuestionsAPI';

export function setupSockets(io: Server) {
  io.on('connection', (socket: Socket) => {
    handleSocketEvents(socket);
  });
}

function handleSocketEvents(socket: Socket) {
  socket.on(RoomEvents.joinRoom, (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);

    // Broadcast a message to all clients in the room when a user joins
    socket.to(room).emit(RoomEvents.userJoined, socket.id);

    socket.on(RoomEvents.codeChange, (code) => {
      // Listen for code changes from a client and broadcast them to others in the room
      socket.to(room).emit(RoomEvents.codeChange, code);
      console.log(`User ${socket.id} changed code: ${code}`);
    });

    socket.on(RoomEvents.disconnect, () => {
      // Listen for disconnects and inform others in the room
      socket.to(room).emit(RoomEvents.userLeft, socket.id);
    });

    // socket.on(RoomEvents.changeQuestion, async (data) => {
    //   try {
    //     console.log(`Received changeQuestion event from user ${socket.id}`);
    //     // move to collab/sockets/utils
    //     const question = await getQuestions(data.category, data.complexity);
    //     socket.to(room).emit(RoomEvents.changeQuestion, question);
    //     console.log('Question changed: ' + question)
    //   } catch (error) {
    //     console.error('Error handling socket event:', error);
    //   }
    // });

    // socket.on(RoomEvents.changeQuestion, (data) => {
    //   console.log(`Received changeQuestion event from user ${socket.id}`);
    //   // move to collab/sockets/utils
    //   // const question = await getQuestions(data.category, data.complexity);
    //   // socket.to(room).emit(RoomEvents.changeQuestion, question);
    //   // console.log('Question changed: ' + question)
    //   socket.to(room).emit(RoomEvents.changeQuestion, data);
    //   console.log('Question changed: ' + data)
    // });
  });
}