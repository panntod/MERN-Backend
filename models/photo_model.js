const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  photoData: {
    type: String,
    required: true
  }
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
