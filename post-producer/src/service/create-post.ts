import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import kafkaConfig from '../config/kafka.config';

const app = new Hono();

app.post(
  "/create-post",
  zValidator("json", z.object({
    title: z.string(),
    content: z.string(),
  })),
  async (c) => {
    const { title, content } = c.req.valid("json");

    try {
      // Send the message to Kafka topic
      await kafkaConfig.sendTopic('post', JSON.stringify({ title, content }));
      // Respond to the client after Kafka message is sent successfully
      return c.json({ message: "Post created" });
    } catch (error) {
      console.error("Error sending message: ", error);
      // Send error response if Kafka message sending fails
      return c.json({ error: "Error sending message" }, 500);
    }
  }
);

export default app;
