const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config();
const icreRouter= express.Router();
const { Configuration, OpenAIApi } = require("openai");
const OpenAI = require('openai');
const { OPENAI_API_KEY ,TARGET_URL} = process.env;


// const configu =new Configuration({
//   apiKey: OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configu);

const openai = new OpenAI(OPENAI_API_KEY);

// A hypothetical search function
async function performSearch(prompt) {

  //console.log(prompt)
  try {
    // Fetch data from the target URL
    const response = await axios.get(TARGET_URL);
    const data = response.data;
    // console.log(data)
    // if there is an element in the data with a matching prompt
    //  Mera falsafaa kandhe pe mera basta
    // Chala main jahaan le chala mujhe rasta gauri
    const matchingElement = data.find(element => element.prompt === prompt);
    console.log(matchingElement)
    if (matchingElement) {
      // If a matching element is found, return its values
      const result = {
        name: matchingElement.name,
        prompt: matchingElement.prompt,
        photo: matchingElement.photo,
      };
      return result;
    } else {
      // Handle the case when no matching element is found
      return { message: 'no search result for prompt in ICre ....!' };
    }
  } catch (error) {
    // Handle any errors that occur during the HTTP request
    console.error(error);
    return { message:error };
  }
}



icreRouter.route('/hello').get((req, res) => {
  res.status(200).json({ message: 'Hello from ICre....!' });
});

icreRouter.route('/').post(async (req, res) => {
  
  const { prompt } = req.body;
     // Attempt OpenAI API call
  try {
    const aiResponse = await openai.images.generate({
      
      model: "dall-e-3",
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    // res.status(200).json({ photo:image});
    // Shaamein malang si,Raatein surang si
   // console.log(image.status)
    if (image) {
      res.status(200).json({ photo: image });
    }  else{
      res.status(500).json('Something went wrong');
      
    }
  } catch (error) {
    console.error(error.status);
    // If image data is undefined, perform a redirect and search for the prompt
       if (error.status === 400 ) {
        // Perform the search
        const searchResult = await performSearch(prompt);
        // Respond with the search result
        console.log("result", searchResult.photo)
        res.status(200).json({ photo: searchResult.photo });
       } else {
        // If it's not a 500 status code, provide a generic error response
        res.status(500).json(error?.response?.data?.error?.message ||'Something went wrong');
      }
   
  }

   
});

module.exports={icreRouter};