import { Admin, Kafka, logLevel, Producer, Consumer } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private consumer: Consumer;
    private brokers: string;

    constructor() {
        this.brokers = process.env.KAFKA_BROKERS || "192.168.0.104:9092";
        this.kafka = new Kafka({
            clientId: 'post-consumer',
            brokers: [this.brokers],
            logLevel: logLevel.INFO, // Change to INFO for more verbose logging during development
        });

        this.consumer = this.kafka.consumer({
            groupId: "post-consumer",
        });
    }

    async connect(): Promise<void> {
        try {
            await this.consumer.connect();
            console.log("Kafka Connected");
        } catch (error) {
            console.error("Error connecting to Kafka:", error);
        }
    }

    async subscribeTopic(topic: string): Promise<void> {
        try {
            await this.consumer.subscribe({
                topic,
                fromBeginning: true,
            });

            console.log("Subscribed to the topic: ", topic);
        } catch (error) {
            console.error("Error subscribing to the topic: ", error);
        }
    }

    async consume(callback: (message: any) => void): Promise<void> {
        try {
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    if (!message) {
                        console.error("Received an undefined message");
                        return;
                    }

                    const value = message.value?.toString();

                    if (value) {
                        try {
                            callback(JSON.parse(value));
                        } catch (parseError) {
                            console.error("Failed to parse message value:", parseError);
                        }
                    } else {
                        console.error("Received message with no value");
                    }
                },
            });
        } catch (error) {
            console.error("Error in consuming messages: ", error);
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.consumer.disconnect();
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
