const mongoose = require("mongoose");

exports.connectDB = async ( app, PORT ) => {
 try {
    await mongoose.connect("mongodb://127.0.0.1:27017/crud_mongo")
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    });
 } catch (error) {
    console.log(error.message);
 }
};