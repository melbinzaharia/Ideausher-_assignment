
const Mongoose = require("mongoose");

const modelName = 'Tag'
const collectionName = 'Tag'


const TagModel= new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tag = Mongoose.model(modelName, TagModel,collectionName);

module.exports = Tag;