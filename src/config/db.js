// db.js
const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.DB_DEV_URL ;

const connectDB = async () => {
    try {
        if (dbURI) {
            await mongoose.connect(dbURI, {
                //useNewUrlParser: true,
                //useUnifiedTopology: true,
            });
            console.log('MongoDB connected successfully');
        } else {
            console.log('ERR: Missing DB Url.');
        }
    } catch (err) {
        console.error('ERR connecting to MongoDB:', err);
        process.exit(1);  // Exit process with failure code
    }
};

module.exports = connectDB;