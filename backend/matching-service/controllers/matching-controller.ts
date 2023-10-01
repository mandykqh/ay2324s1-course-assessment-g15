// controllers/matchmakingController.js
import amqp from 'amqplib';
import express from 'express';
const RABBITMQ_URL = 'amqp://localhost'; // Replace with your RabbitMQ server's URL
const RABBITMQ_QUEUE = 'matching_queue';

async function setupRabbitMQ() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(RABBITMQ_QUEUE);

  return channel;
}

export const requestMatch = async (req: express.Request, res: express.Response) => {
  const { client_id } = req.body;

  const channel = await setupRabbitMQ();

  // Publish the client's request to the RabbitMQ queue
  channel.sendToQueue(RABBITMQ_QUEUE, Buffer.from(JSON.stringify({ client_id })));

  res.json({ message: `Request from client ${client_id} added to the queue` });
};

export const checkMatch = async (req: express.Request, res: express.Response) => {
  const { client_id } = req.query;

  const channel = await setupRabbitMQ();

  // Simulate checking if there's a match (timeout logic not included here)
  // In a real application, you would check for a match in a separate worker process.
  // For now, we just return a placeholder message.
  res.json({ message: `Checking match status for client ${client_id}` });
};


