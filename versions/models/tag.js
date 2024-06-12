
const Mongoose = require("mongoose");

const modelName = 'Tag'
const collectionName = 'Tag'


const TagModel= new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Tag = mongoose.model(modelName, TagModel,collectionName);

module.exports = Tag;