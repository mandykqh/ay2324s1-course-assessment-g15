import { Server, Socket } from 'socket.io';
import { RoomEvents } from '../types/enums/RoomEvents';
import { getFilteredQuestion, getQuestions } from '../api/Questions';
import { DrawLineProps } from '../types/drawtypes/drawtypes';

// Store for the code in each room
const roomCodes: Record<number, string> = {};

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

    // Emit the current code to the user who joined
    const currentCode = roomCodes[room] || ''; // Default to an empty string if no code is stored
    socket.emit(RoomEvents.codeChange, currentCode);

    socket.on(RoomEvents.languageChange, (language) => {
      // Listen for language changes from a client and broadcast them to others in the room
      socket.to(room).emit(RoomEvents.languageChange, language);
      console.log(`User ${socket.id} changed language: ${language}`);
    });

    socket.on(RoomEvents.codeChange, (code) => {
      roomCodes[room] = code;

      socket.to(room).emit(RoomEvents.codeChange, code);
    });

    socket.on(RoomEvents.disconnect, () => {
      socket.to(room).emit(RoomEvents.userLeft, socket.id);
    });

    socket.on(RoomEvents.messageChange, (message, user) => {
      socket.to(room).emit(RoomEvents.messageChange, message, user);
      console.log(`User ${socket.id} sent message: ${message}`);
    });

    socket.on(RoomEvents.clientReady, () => {
      socket.to(room).emit('get-canvas-state');
    })

    socket.on(RoomEvents.canvasState, (state) => {
      console.log('received canvas state');
      socket.to(room).emit('canvas-state-from-server', state)
    })

    socket.on(RoomEvents.drawLine, ({ prevPoint, currentPoint, color, width }: DrawLineProps) => {
      socket.to(room).emit('draw-line', { prevPoint, currentPoint, color, width })
    })

    socket.on(RoomEvents.canvasClear, () => socket.to(room).emit('canvas-clear'))

    socket.on(RoomEvents.changeQuestion, async (data) => {
      // Listen for code changes from a client and broadcast them to others in the room
      socket.to(room).emit('changeQuestion', data);
      const question = await getFilteredQuestion(data.id, data.categories, data.complexity);

      console.log(`Question changed`);
      socket.to(room).emit('newQuestion', question);
      socket.emit('newQuestion', question);
    });
  });
}
