const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
const connectDB = require('./config/db');
const productRoutes = require('./routers/r_product');
const errorHandler = require('./midderware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

//สั่งให้ข้อมูล incoming request เป็น format json ตลอด
app.use(express.json());
//urlencode payload
app.use(express.urlencoded({ extended: true }));
//allow getting client's IP address
app.set('trust proxy', true);

// Connect to MongoDB
connectDB();

const ENV = process.env.NODE_ENV;
const API = process.env.API;
const PORT = process.env.PORT;

async function onStart() {
    try {
        console.log(`Server running on path ${API} at port ${PORT} - ENV: ${ENV} `);
    } catch (error) {
        console.log(error);
    }
}

app.listen(PORT, onStart);

app.use(API, productRoutes);

// Error Handling Middleware
app.use(errorHandler);
