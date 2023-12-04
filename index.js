const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user_route');

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

const PORT = 5000; // Ganti dengan port yang Anda inginkan
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});