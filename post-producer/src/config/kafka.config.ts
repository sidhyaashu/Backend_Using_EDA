import { Admin, Kafka, logLevel, Producer } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;
    private brokers: string;

    constructor() {
        this.brokers = process.env.KAFKA_BROKERS || "192.168.0.104:9092";
        this.kafka = new Kafka({
            clientId: 'post-producer',
            brokers: [this.brokers],
            logLevel: logLevel.INFO, // Change to INFO for more verbose logging during development
        });

        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
    }

    async connect(): Promise<void> {
        try {
            await this.producer.connect();
            await this.admin.connect();
            console.log("Kafka Connected");
        } catch (error) {
            console.error("Error connecting to Kafka:", error);
        }
    }

    async createTopic(topic: string, numPartitions: number = 1): Promise<void> {
        try {
            const existingTopics = await this.admin.listTopics();
            if (existingTopics.includes(topic)) {
                console.log(`Topic already exists: ${topic}`);
                return;
            }

            await this.admin.createTopics({
                topics: [{ topic, numPartitions }],
            });
            console.log(`Topic Created: ${topic} with ${numPartitions} partition(s)`);
        } catch (error) {
            console.error("Error creating topic: ", error);
        }
    }

    async sendTopic(topic: string, message: string): Promise<void> {
        try {
            await this.producer.send({
                topic,
                messages: [{ value: message }],
            });
            console.log("Message sent to topic: ", topic);
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.producer.disconnect();
            await this.admin.disconnect();
            console.log("Kafka Disconnected");
        } catch (error) {
            console.error("Error disconnecting Kafka: ", error);
        }
    }
}

// Handle graceful shutdown
const kafkaConfig = new KafkaConfig();

process.on('SIGINT', async () => {
    console.log('Disconnecting Kafka...');
    await kafkaConfig.disconnect();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Disconnecting Kafka...');
    await kafkaConfig.disconnect();
    process.exit(0);
});


export default kafkaConfig;
