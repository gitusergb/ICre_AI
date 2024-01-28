const mongoose = require("mongoose")
require("dotenv").config()

const postSchema= mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },

},{
    versionKey:false
});

const PostModel = mongoose.model('post', postSchema);

module.exports ={PostModel};