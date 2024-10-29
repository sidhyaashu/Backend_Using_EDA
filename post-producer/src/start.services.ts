import kafkaConfig from "./config/kafka.config";

const init = async () =>{
    try{
        await kafkaConfig.connect();
        await kafkaConfig.createTopic("post");
    }catch(error){
        console.error("Error initializing services: ",error);
        process.exit(1);
    }
}

export default init;