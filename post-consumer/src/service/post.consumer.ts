import kafkaConfig from "../config/kafka.config";
import PostModel from "../model/post";

interface PostMessage {
    title: string;
    content: string;
}

const postConsumer = async () => {
    const messages: PostMessage[] = [];
    let processing = false;

    try {
        await kafkaConfig.subscribeTopic("post");

        await kafkaConfig.consume(async (message: PostMessage) => {
            messages.push(message);
            console.log("Message received: ", message);

            if (messages.length > 100) {
                // Process messages immediately when the threshold is reached
                await processMessages();
            }
        });

        setInterval(async () => {
            await processMessages(); // Process messages every 5 seconds
        }, 5000);
    } catch (error) {
        console.error("Error in Kafka consumer: ", error);
    }

    async function processMessages() {
        if (messages.length > 0 && !processing) {
            processing = true;
            const batchToProcess = [...messages];
            messages.length = 0; // Clear the messages array

            try {
                await PostModel.insertMany(batchToProcess, { ordered: false });
                console.log("Bulk insertion completed");
            } catch (error) {
                console.error("Error while inserting messages: ", error);
                // Re-add messages to process again later
                messages.push(...batchToProcess);
            } finally {
                processing = false;
            }
        }
    }
};

export default postConsumer;
