import mongoose, { Document, Schema } from "mongoose";

// Define the Post interface extending Document for Mongoose compatibility
interface Post extends Document {
    title: string;
    content: string;
}

// Create a schema for the Post
const postSchema = new Schema<Post>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

// Create and export the Post model
const PostModel = mongoose.model<Post>("Post", postSchema);
export default PostModel;
