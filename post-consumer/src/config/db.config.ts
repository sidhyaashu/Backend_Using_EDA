import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/kafka';

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error connecting to MongoDB:', error.message);
        } else {
            console.error('Unknown error occurred while connecting to MongoDB');
        }
        process.exit(1);
    }
};

export default connectDB;
