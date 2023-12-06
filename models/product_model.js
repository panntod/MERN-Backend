const mongoose = require('mongoose');
const { Schema } = mongoose; 

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    idUpload: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
