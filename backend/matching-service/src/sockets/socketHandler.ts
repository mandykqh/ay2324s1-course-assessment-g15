import { Server, Socket } from 'socket.io';
import { requestMatch } from '../controllers/matching-controller';
import ampq from 'amqplib';

export function setupSockets(io: Server, channel: ampq.Channel) {
    io.on('connection', (socket: Socket) => {
      handleSocketEvents(socket, channel);
    });
}

function handleSocketEvents(socket: Socket, channel: ampq.Channel) {
    
    console.log(`Client connected: ${socket.id}`);
    socket.on('find_match', (data) => {
        let matched = false;
        console.log(`matching ${data.user_id}`)
        requestMatch(channel, data.categories, data.difficulty, data.user_id);
        socket.emit('finding_match', {
            message: `Connected to matching service at port ${process.env.MATCHING_PORT}`
        });
        channel.consume('matchingQueue', (msg) => {
            const obj = JSON.parse(msg.content.toString());
            if(obj.user_id === data.user_id) {
                console.log(`Adding ${obj.user_id} to room`);//add room service
                channel.ack(msg);
                socket.emit('match_found', {
                    msg: `Match found: matched with ${obj.other_user}`,
                    user_id: data.user_id,
                    other_user: obj.other_user,
                    //add room here
                });
                matched = true;
                // for room logic using collab service api
            }
            setTimeout(() => {
                matched || socket.disconnect();
            }, 30000);
        });
    });
        // Simulate sending a welcome message to the connected client
        // You can add more socket.io event handlers here 
}