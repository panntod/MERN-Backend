const { connectDB } = require("../config/connection");
const User = require("../models/user_model");

exports.getUser = async () => {
  await connectDB();
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

exports.addUser = async (name, age, address, email, password) => {
  await connectDB();
  try {
    const newUser = new User({ name, age, address, email, password });
    const insertedUser = await newUser.save();
    return insertedUser;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

exports.updateUser = async (id, name, age, address, email, password) => {
  await connectDB();
  try {
    const existingUser = await User.findOne({ email });

    if(!existingUser){
      const error = new Error("User Not Found");
      error.status = 404;
      throw error;
    }
    
    if (existingUser && existingUser._id.toString() !== id) {
      const error = new Error("Email already exists");
      error.status = 409;
      throw error;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, address, email, password },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

exports.deleteUser = async (id) => {
  await connectDB();
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("User not found or already deleted");
    } else {
      console.log("Success Deleted User");
    }

    return deletedUser;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

exports.loginUser = async (email, password) => {
  await connectDB();
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.password !== password) {
      return { success: false, message: "Incorrect password" };
    }

    return { success: true, message: "Login successful", user };
  } catch (error) {
    return { success: false, message: "Error logging in", error };
  }
};
