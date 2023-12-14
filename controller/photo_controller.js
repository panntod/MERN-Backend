const Photo = require("../models/photo_model");
const fs = require("fs");

// Fungsi untuk mendapatkan semua foto
exports.getPhotos = async () => {
  try {
    const photos = await Photo.find({});
    return photos;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Fungsi untuk mendapatkan semua foto
exports.findPhotoById = async (id) => {
  try {
    const photos = await Photo.findById({id});
    return photos;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

// Fungsi untuk menambahkan foto baru
exports.addPhoto = async (photoData) => {
  try {
    const newPhoto = new Photo({ photoData });
    const insertedPhoto = await newPhoto.save();
    return insertedPhoto;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

exports.deletePhoto = async (id) => {
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
