import connectDB from "./config/db.config"
import kafkaConfig from "./config/kafka.config";
import postConsumer from "./service/post.consumer";



const init = async()=>{
    try {
        await connectDB();
        await kafkaConfig.connect();
        await postConsumer();
    } catch (error) {
        console.error("Error initializing services: ",error);
        process.exit(1);
    }
}


export default init;