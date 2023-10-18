import amqp from 'amqplib';
import { categoryEnum, complexityEnum } from '../types/enums';
import { getQuestions } from '../api/QuestionsAPI';
import { getRoomID } from '../api/CollaborationAPI';

export const rabbitMQSetup = async () => {
  try{
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
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
        const { categories, complexity } = parseQueueString(queueName);
        const question = await getQuestions(categories, complexity);
        const roomID = await getRoomID();
        
        const confirmation1 = {
          user_id: user1ID,
          other_user: user2ID,
          room_id: roomID.roomNumber,
          question
        };
        const confirmation2 = {
          user_id: user2ID,
          other_user: user1ID,
          room_id: roomID.roomNumber,
          question
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

export const requestMatch = async (channel:amqp.Channel, categories: string[], complexity: string, client:string) => {
  try{ 
    for (const category of categories) {
      let queue = `${category}_${complexity}`;
      channel.sendToQueue(queue, Buffer.from(client));
    }
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
  
export const deQueue = async (channel:amqp.Channel, categories:string[], complexity:string) => {
  try{
    for (const category of categories) {
      let queue = `${category}_${complexity}`;
      await channel.get(queue).then((user) => {
        if(user !== false){
          console.log(`dequeued user ${user.content.toString()} from ${queue}`);
          channel.ack(user);
        }
      });
    } 
  } catch (err) {
    console.error(err);
  }
};

function parseQueueString(input: string): { categories: string[], complexity: string } {
  // Extracts categories and complexity from a queue name
  // input is in the form of "category1_categoryn_complexity"

  const parts = input.split('_');

  const categories = parts.slice(0, -1);
  const complexity = parts[parts.length - 1];

  return {
    categories,
    complexity,
  };
}