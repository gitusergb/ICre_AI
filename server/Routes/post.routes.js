const express = require('express');
const dotenv = require('dotenv');
// import { v2 as cloudinary } from 'cloudinary';
// Suhaanaa safar aur ye mausam hasi,Gauri Hame dar hai ham kho na jaae kahi
const cloudinary = require('cloudinary').v2;
const { PostModel} =require('../mongodb/Model/PostModel');

dotenv.config();

const postRouter = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//get all image posts
postRouter.route('/').get(async (req, res) => {
  try {
    const posts = await PostModel.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching image posts failed, please try again' });
  }
});


//create an image post 
postRouter.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
   
    const photoUrl = await cloudinary.uploader.upload(photo);

    const newPost = await PostModel.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    //console.log( "newPost",newPost);
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message:'Unable to create an image post, please try again' });
  }
});

module.exports={postRouter};