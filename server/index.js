
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require('axios');

const {Connection} = require("./mongodb/connect")
const { postRouter } =require('./Routes/post.routes.js');
const {icreRouter}=require('./Routes/icre.routes');



const app = express();


app.use(bodyParser.json());

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post',postRouter);
app.use('/api/v1/icre',icreRouter);


app.get('/', async (req, res) => {
    res.status(200).json({
      message: 'Hello from ICre AI!',
    });
  });


  const startServer = async () => {
    try {
       Connection(process.env.MONGODB_URL);
      app.listen(9000,() => console.log('Server started on port http://localhost:9000'));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();