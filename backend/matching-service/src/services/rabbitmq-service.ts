import amqp from 'amqplib';
import { categoryEnum, complexityEnum } from './enums';
const RABBITMQ_URL = 'amqp://localhost:5672';

export const rabbitMQSetup = async () => {
  try{
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(`confirmation_Queue`, { durable: false });
    for (const category of categoryEnum) {
      for (const complexity of complexityEnum) {
        const queueName = `${category}_${complexity}`;
        await channel.assertQueue(queueName, { durable: false });
        console.log(`Channel and Queue created for ${category}_${complexity}`);
      }
    }
    return channel;
  } catch (err) {
    console.log(err);
  }
}

async function matchUsers(queueName : string, channel: amqp.Channel) {
  try{
    await channel.checkQueue(queueName).then(async (queue) => {
      let user1ID, user2ID;
      if(queue.messageCount >= 2){
        await channel.get(queueName).then((user1) => {
          if(user1 !== false){
            channel.ack(user1);
            user1ID = user1.content.toString();
          }
        });
        
        await channel.get(queueName).then((user2) => {
          if(user2 !== false){
            channel.ack(user2);
            user2ID = user2.content.toString();
          }
        });
        const confirmation1 = {
          user_id: user1ID,
          other_user: user2ID,
        };
        const confirmation2 = {
          user_id: user2ID,
          other_user: user1ID,
        };
        channel.sendToQueue('confirmation_Queue', Buffer.from(JSON.stringify(confirmation1)));
        channel.sendToQueue('confirmation_Queue', Buffer.from(JSON.stringify(confirmation2)));
        console.log(`matched users ${user1ID} and ${user2ID}`);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

export const requestMatch = async (channel:amqp.Channel, category: string, complexity: string, client:string) => {
  try{
    const queue = `${category}_${complexity}`;
    channel.sendToQueue(queue, Buffer.from(client));
  } catch (err) {
    console.log(err);
  }
};


export const processQueues = async (channel:amqp.Channel) => {
  for (const category of categoryEnum) {
    for (const complexity of complexityEnum) {
      matchUsers(`${category}_${complexity}`, channel);
    }
  }
};
  
export const deQueue = async (channel:amqp.Channel, categories:string, complexity:string) => {
  try{
    const queue = `${categories}_${complexity}`;
    await channel.get(queue).then((user) => {
      if(user !== false){
        console.log(`dequeued user ${user.content.toString()}`)
        channel.ack(user);
      }
    });
  } catch (err) {
    console.error(err);
  }
};