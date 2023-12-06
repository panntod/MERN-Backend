const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  namaFile: String,
  data: Buffer
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;
