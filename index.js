const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const { connectDB } = require("./config/connection");

const userRoutes = require('./routes/user_route');
const productRoutes = require('./routes/product_route');
const photoRoutes = require('./routes/photo_routes');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.use('/users', userRoutes);
app.use('/product', productRoutes);
app.use('/photo', photoRoutes);

const PORT = 5000; 
connectDB( app, PORT )