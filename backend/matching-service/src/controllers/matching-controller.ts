// controllers/matchmakingController.js
import amqp from 'amqplib';
import { categoryEnum, complexityEnum } from './enums';
const RABBITMQ_URL = 'amqp://localhost:5672'; // add to dot env file

export const rabbitMQSetup = async () => {
  try{
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(`matchingQueue`, { durable: false });
    for (const category of categoryEnum) {
      for (const difficulty of complexityEnum) {
        const queueName = `${category}_${difficulty}`;
        await channel.assertQueue(queueName, { durable: false });
        console.log(`Channel and Queue created for ${category}_${difficulty}`);
      }
    }
    return channel;
  } catch (err) {
    console.log(err);
  }
}

export const requestMatch = async (channel: amqp.Channel, category: string, difficulty: string, client:string ) => {
  try{
    const queue = `${category}_${difficulty}`;
    channel.sendToQueue(queue, Buffer.from(client));
  } catch (err) {
    console.log(err);
  }
};

async function matchUsers(queueName : string, channel: amqp.Channel) {
  try{
    await channel.checkQueue(queueName).then(async (queue) => {
      let user1ID, user2ID;
      if(queue.messageCount >= 2){
        const user1 = await channel.get(queueName);
        if(user1 !== false){
          channel.ack(user1)
          user1ID = user1.content.toString();
        }
        const user2 = await channel.get(queueName);
        if(user2 !== false){
          channel.ack(user2)
          user2ID = user2.content.toString();
        }
        // use user1 and 2 with collab service
        const confirmation1 = {
          user_id: user1ID,
          other_user: user2ID,
        };
  
        const confirmation2 = {
          user_id: user2ID,
          other_user: user1ID,
        };
        channel.sendToQueue('matchingQueue', Buffer.from(JSON.stringify(confirmation1)));
        channel.sendToQueue('matchingQueue', Buffer.from(JSON.stringify(confirmation2)));
        console.log(`matched users ${user1ID} and ${user2ID}`);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processQueues = async (channel:amqp.Channel) => {
  for (const category of categoryEnum) {
    for (const difficulty of complexityEnum) {
      await matchUsers(`${category}_${difficulty}`, channel);
    }
  }
}



