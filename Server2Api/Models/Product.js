const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: { type: Number , required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: { type: Number, required: true },  
}, { timestamps: true });

module.exports = mongoose.model('Product', ItemSchema);