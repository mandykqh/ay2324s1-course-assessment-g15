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