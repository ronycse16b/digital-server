const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const databaseConnect = require('./config/db')
const authRoutes = require('./routes/auth.route')
const DataRoute = require('./routes/data.route')
const cookieParser = require ('cookie-parser');
const port = process.env.PORT || 5000;

// env config 
dotenv.config();
// database connect 
databaseConnect()

const corsOptions ={
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
  }
  
  app.use(cors(corsOptions))

app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/data', DataRoute);

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log("Listening on port " + port);
});
