// const express = require("express");
// const app = express();
// const cors = require("cors");
// const dotenv = require("dotenv");
// const morgan = require("morgan");
// const databaseConnect = require('./config/db')
// const authRoutes = require('./routes/auth.route')
// const DataRoute = require('./routes/data.route')
// const cookieParser = require ('cookie-parser');
// const port = process.env.PORT || 5000;

// // env config 
// dotenv.config();
// // database connect 
// databaseConnect()

// const corsOptions ={
//     origin:'*', 
//     credentials:true,
//     optionSuccessStatus:200,
//   }
  
//   app.use(cors(corsOptions))

// app.use(cookieParser());
// app.use(express.json());
// app.use(morgan('dev'));

// // routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/data', DataRoute);

// app.get('/', (req, res) => {
//     res.send('Server is running');
// });

// app.listen(port, () => {
//     console.log("Listening on port " + port);
// });


import path from 'path'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import userRoutes from './routes/user.route.js'
import dataRoutes from './routes/data.route.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import morgan from 'morgan'



const __dirname = path.resolve()

// Deployment configuration
//configure env file in dev mode
dotenv.config()

// configure env file in production
if (process.env.NODE_ENV === undefined) {
  dotenv.config({ path: '../.env' })
}

// Connect to database
connectDB()

const app = express()
app.use(cors());
// Body parser
app.use(express.json())
app.use(morgan('dev'))
// CORS



app.get('/', (req, res) => {
  res.send('Hello form server!');
});

// routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/data', dataRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

// Middleware
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      .yellow.bold
  )
)
