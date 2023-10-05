import { Socket } from 'socket.io';
import { requestMatch, deQueue } from '../services/queueing-service';
import ampq from 'amqplib';

export async function findMatch(socket: Socket, channel: ampq.Channel, data:any) {
  console.log(`matching ${data.user_id}`);
  requestMatch(channel, data.categories, data.difficulty, data.user_id);
  socket.emit('finding_match', {
      message: `Connected to matching service at port ${process.env.MATCHING_PORT}`
  });

  setTimeout(() => {
    handleTimeout(socket, channel, data);  
  }, 30000);

  while(true){
    channel.consume('matchingQueue', (msg) => {
      const obj = JSON.parse(msg.content.toString());
      if (obj.user_id === data.user_id) {
        console.log(`Adding ${obj.user_id} to room`); // Add room service
        channel.ack(msg);
        socket.emit('match_found', {
          msg: `Match found: matched with ${obj.other_user}`,
          user_id: data.user_id,
          other_user: obj.other_user,
          // Add room logic here
        });
        socket.disconnect();
      }
    });
  };
} 

function handleTimeout(socket: Socket, channel: ampq.Channel, data:any) {
  deQueue(channel, data.categories, data.difficulty);
  socket.emit('timeout', {
    msg: 'Queue timeout, please requeue',
  });
  socket.disconnect();   
}

