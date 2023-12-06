const { connectDB } = require("../config/connection");
const Photo = require("../models/photo_model");
const fs = require("fs");

// Fungsi untuk mendapatkan semua foto
exports.getPhotos = async () => {
  await connectDB();
  try {
    const photos = await Photo.find({});
    return photos;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Fungsi untuk menambahkan foto baru
exports.addPhoto = async (namaFile, data) => {
  await connectDB();
  try {
    const newPhoto = new Photo({ namaFile, data });
    const insertedPhoto = await newPhoto.save();
    return insertedPhoto;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

exports.updatePhoto = async (id, namaFile, data) => {
  await connectDB();
  try {
    const updatePhoto = await Photo.findByIdAndUpdate(
      id,
      { namaFile, data },
      { new: true }
    );

    if (!updatePhoto) {
      const error = new Error("Photo Not Found");
      error.status = 404;
      throw error;
    }

    return updatePhoto;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

exports.deletePhoto = async (id) => {
  await connectDB();
  try {
    const deletedPhoto = await Photo.findOneAndDelete( {_id: id });

    if (!deletedPhoto) {
      console.log("Product not found or already deleted");
    } else {
      console.log("Success Deleted User");
    }

    return deletedPhoto;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
