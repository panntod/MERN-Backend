const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user_route');
const productRoutes = require('./routes/product_route');
const photoRoutes = require('./routes/photo_routes');

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/product', productRoutes);
app.use('/photo', photoRoutes);

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});