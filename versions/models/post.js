const Mongoose = require("mongoose");

const modelName = 'PostModel'
const collectionName = 'Post_model'

const PostModel =  new Mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    tags: {
      type: [String], 
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  

 

const Post = Mongoose.model(modelName, PostModel, collectionName);
module.exports = Post