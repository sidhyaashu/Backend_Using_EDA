import { Admin, Kafka, logLevel, Producer } from "kafkajs";

class KafkaConfig {
    private kafka: Kafka;
    private producer: Producer;
    private admin: Admin;
    private brokers: string;

    constructor() {
        this.brokers = process.env.KAFKA_BROKERS || "192.168.0.107:9092";
        this.kafka = new Kafka({
            clientId: 'post-producer',
            brokers: [this.brokers],
            logLevel: logLevel.ERROR
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
            console.log("Error connecting to kafka:", error);
        }
    }


    async createTopic(topic: string): Promise<void> {
        try {
            await this.admin.createTopics({
                topics: [{ topic, numPartitions: 1 }]
            });
            console.log("Topic Created: ", topic);
        } catch (error) {
            console.error("Error creating topic: ", error);
        }
    }


    async sendTopic(topic: string, message: string): Promise<void> {
        try {
            await this.producer.send({
                topic,
                messages: [{ value: message }]
            });
            console.log("Message send to topic: ", topic);
        } catch (error) {
            console.log("Error sending message: ", error);
        }
    }


    async disconnect(): Promise<void> {
        try {
            await this.producer.disconnect();
            await this.admin.disconnect();
            console.log("Kafka Disconnected");
        } catch (error) {
            console.error("Error disconneting Kafka: ", error);
        }
    }

}


export default new KafkaConfig();