import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()

import data from './routes/index.js'

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL; 

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/api/v1/', data);

mongoose.connect(MONGO_URL)
.then(
   ()=> {
    app.listen(PORT, ()=> console.log('server listening on port: '+PORT))
   }
)
.catch((err)=>console.error(err.message))