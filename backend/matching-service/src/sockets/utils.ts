import { Socket } from 'socket.io';
import { requestMatch, deQueue } from '../services/rabbitmq-service';
import ampq from 'amqplib';

function handleTimeout(socket: Socket, channel: ampq.Channel, data:any) {
  deQueue(channel, data.categories, data.difficulty);
  socket.emit('timeout', {
    msg: 'Queue timeout, please requeue',
  });
  socket.disconnect();   
}

export async function findMatch(socket: Socket, channel: ampq.Channel, data:any) {
  console.log(`matching ${data.user_id}`);
  requestMatch(channel, data.categories, data.difficulty, data.user_id);
  socket.emit('finding_match', {
      message: `Connected to matching service at port:3000`
  });

  setTimeout(() => {
    handleTimeout(socket, channel, data);  
  }, 30000);
  
  channel.consume('confirmation_Queue', (msg) => {
    try{
      const obj = JSON.parse(msg.content.toString());
      if (obj.user_id === data.user_id) {
        channel.ack(msg);
        socket.emit('match_found', {
          msg: `Match found: matched with ${obj.other_user}`,
          user_id: data.user_id,
          other_user: obj.other_user,
        });
        socket.disconnect();
      } else {
        channel.reject(msg, true);
      }
    } catch (err) {
      console.error(err);
    }
  });
} 


