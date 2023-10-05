import amqp from 'amqplib';
// controllers/matchmakingController.js
import { categoryEnum, complexityEnum } from '../services/enums';


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

export const requestMatch = (channel:amqp.Channel, category: string, difficulty:string, client:string) => {
  try{
    const queue = `${category}_${difficulty}`;
    channel.sendToQueue(queue, Buffer.from(client));
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
};
  
export const deQueue = async (channel:amqp.Channel, categories:string, difficulty:string) => {
  const queue = `${categories}_${difficulty}`;
  await channel.get(queue).then((user) => {
    if(user !== false){
      console.log(`dequeued user ${user.content.toString()}`)
      channel.ack(user);
    }
  });
};