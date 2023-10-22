import { Socket } from 'socket.io';
import { requestMatch, deQueue } from '../services/rabbitmq-service';
import ampq from 'amqplib';


export async function findMatch(socket: Socket, channel: ampq.Channel, data:any) {
  console.log(`matching ${data.user_id}`);
  requestMatch(channel, data.categories, data.complexity, data.user_id);

  socket.emit('finding_match', {
      message: `Connected to matching service at port: ${process.env.RABBITMQ_PORT || 3000}`
  });  

  // Creates consumers for confirmed matches
  const consumer = await channel.consume('confirmation_Queue', (msg) => {
    try{
      const obj = JSON.parse(msg.content.toString());
      if (obj.user_id === data.user_id) {
        socket.emit('match_found', {
          msg: `Match found! You have been matched with user ${obj.other_user}`,
          user_id: data.user_id,
          other_user: obj.other_user,
          room_id: obj.room_id,
          question: obj.question,
        });

        deQueue(channel, data.categories, data.complexity);
        channel.ack(msg);
        channel.cancel(msg.fields.consumerTag);

      } else {
        channel.reject(msg, true);
      }
    } catch (err) {
      console.error(err);
    }
  })
  
  // 30s timeout (set to 31000 to account for frontend delay)
  const timeout = setTimeout(() => {
    handleTimeout(socket, channel, data, consumer);  
  }, 31000);

  // resets timeout and clears queues on cancellation event
  socket.on('cancel_match', async (data) => {
    console.log(`cancelling match: ${socket.id}`);
    cancelMatch(channel, consumer, data); 
    clearTimeout(timeout);
    socket.disconnect();
  });
} 

async function cancelMatch(channel: ampq.Channel, consumer:any, data:any) {
  try{
    const consumerObj = await consumer;
    channel.cancel(consumerObj.consumerTag);
    deQueue(channel, data.categories, data.complexity);
  } catch (e) {
    console.error(e);
  }
} 

function handleTimeout(socket: Socket, channel: ampq.Channel, data:any, consumer:any) {
  try{
    cancelMatch(channel, consumer, data);
    socket.emit('timeout', {
      msg: 'Queue timeout, please requeue',
    }); 
    socket.disconnect();
  } catch (e) {
    console.error(e);
  }
}
