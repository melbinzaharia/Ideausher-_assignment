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
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
  });
  

 

const Post = Mongoose.model(modelName, PostModel, collectionName);
module.exports = Post