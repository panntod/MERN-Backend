const { connectDB } = require("../config/connection");
const Product = require("../models/product_model");

exports.getProduct = async () => {
  await connectDB();
  try {
    const products = await Product.find({}).populate("idUpload", "name");
    return products;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

exports.addProduct = async (name, type, price, idUpload) => {
  await connectDB();
  try {
    const newProduct = new Product({ name, type, price, idUpload });
    const insertedProduct = await newProduct.save();
    return insertedProduct;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

exports.updateProduct = async (id, name, type, price, idUpload) => {
  await connectDB();
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { name, type, price, idUpload },
      { new: true }
    );

    if(!updateProduct){
      const error = new Error("Product Not Found");
      error.status = 404;
      throw error;
    }
    
    return updateProduct;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

exports.deleteProduct = async (id) => {
  await connectDB();
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log("Product not found or already deleted");
    } else {
      console.log("Success Deleted User");
    }

    return deletedProduct;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
