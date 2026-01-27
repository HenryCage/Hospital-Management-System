import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dbConnect.js';

import authroutes from './routes/authRoute.js';
import userRoutes from './routes/staffRoutes.js'
import patientRoutes from './routes/patientRoute.js'
import visitRoutes from './routes/visitRoutes.js'
import vitalsRoutes from './routes/vitalsRoute.js'

dotenv.config();
const port = process.env.PORT

const app = express()
app.use(express.json())

connectDB();

import cors from 'cors'
app.use(cors(
  {
    origin: 'https://donor-management-system.vercel.app',
    // credentials: true
  }
))

app.use('/auth', authroutes);
app.use('/users/get', userRoutes)
app.use('/patient', patientRoutes)
app.use('/visit', visitRoutes)
app.use('/vitals', vitalsRoutes)

app.listen(port, () => {
  console.log('Server is Running on port ' + port)
})

