import { Server, Socket } from 'socket.io';
import { RoomEvents } from '../types/enums/RoomEvents';
import { getFilteredQuestion, getQuestions } from '../api/Questions';
import {DrawLine} from '../types/drawtypes/drawtypes';

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

    socket.on(RoomEvents.languageChange, (language) => {
      // Listen for language changes from a client and broadcast them to others in the room
      socket.to(room).emit(RoomEvents.languageChange, language);
      console.log(`User ${socket.id} changed language: ${language}`);
    });

    socket.on(RoomEvents.codeChange, (code) => {
      // Listen for code changes from a client and broadcast them to others in the room
      socket.to(room).emit(RoomEvents.codeChange, code);
      console.log(`User ${socket.id} changed code: ${code}`);
    });

    socket.on(RoomEvents.disconnect, () => {
      // Listen for disconnects and inform others in the room
      socket.to(room).emit(RoomEvents.userLeft, socket.id);
    });

    socket.on(RoomEvents.messageChange, (message) => {
      socket.to(room).emit(RoomEvents.messageChange, message);
      console.log(`User ${socket.id} sent message: ${message}`);
    });

    socket.on(RoomEvents.clientReady, () => {
      socket.to(room).emit('get-canvas-state')
    })

    socket.on(RoomEvents.canvasState, (state) => {
      console.log('received canvas state')
      socket.to(room).emit('canvas-state-from-server', state)
    })

    socket.on(RoomEvents.drawLine, ({ prevPoint, currentPoint, color }: DrawLine) => {
      socket.to(room).emit('draw-line', { prevPoint, currentPoint, color })
    })

    socket.on(RoomEvents.canvasClear, () => socket.to(room).emit('canvas-clear'))

    socket.on('changeQuestion', async (data) => {
      // Listen for code changes from a client and broadcast them to others in the room
      console.log(`question data propogated: ${data.categories}, ${data.complexity}`);
      socket.to(room).emit('changeQuestion', data);
      // const question = await getQuestions(data.qnCategory, data.qnComplexity);
      const question = await getFilteredQuestion(data.id, data.categories, data.complexity);

      console.log(`Question changed`);
      socket.to(room).emit('newQuestion', question);
      socket.emit('newQuestion', question);
    });
  });
}
