require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const Stripe = require('stripe');
const cors = require('cors');

// CONNECTING DATA BASE
connectDB();

const app = express();
app.use(express.json());
// APROVING CROSS ORIGIN
app.use(cors({ origin: "http://localhost:3000" }));


const stripe = Stripe(process.env.SEC_KEY);


app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.post("/api/checkout", async (req, res) => {
      try {
            const { id, amount } = req.body;

            const payment = await stripe.paymentIntents.create({
                  amount: amount,
                  currency: "MXN",
                  description: "Sitio E commerce",
                  payment_method: id,
                  confirm: true
            });

            res.send({ message: 'Successfull payment!' });
      } catch (error) {
            res.json({ message: error.raw.message });
      }
});


const PORT = process.env.PORT || 5000;
// CREATING SERVER ADDING LISTENER TO REQUESTS ON A SPECIFIC PORT 5000 
app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
});


