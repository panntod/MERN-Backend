const mongoose = require("mongoose");

exports.connectDB = async () => {
 try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/crud_mongo");
    console.log("Server up and running");
 } catch (error) {
    console.log(error.message);
 }
};

exports.closeDB = async () => {
 try {
    await mongoose.connection.close();
    console.log("Connection closed");
 } catch (error) {
    console.log(error.message);
 }
};