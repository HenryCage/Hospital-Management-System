import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dbConnect.js';
import authroutes from './routes/authRoute.js';
dotenv.config();
const port = process.env.PORT

const app = express()
app.use(express.json())

connectDB();

import cors from 'cors'
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use('/auth', authroutes);


app.listen(port, () => {
  console.log('Server is Running on port ' + port)
})

