import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    game:String,
    username:String,
    postDate:String,
    postTitle:String,
    image:String,
    postDesc:String,
    vote:Number,
    commentNo:Number,
    postid: {
      type: String,
      unique: true,
      required: true
      }

}); 

const Post = mongoose.model('Post', PostSchema);

export default Post;