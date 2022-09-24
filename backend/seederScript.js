require("dotenv").config();
const productData = require('./data/db');
const connectDB = require('./config/dbConnection');
const Product = require('./models/Product');

// CONNECTING DATA BASE
connectDB();

const imporData = async () => {
    try {
        await Product.deleteMany({});

        await Product.insertMany(productData);

        console.log("Data import success");

        process.exit();
    } catch (error) {
        console.log("Error with data import", error);
        process.exit(1);
    }
};

imporData();