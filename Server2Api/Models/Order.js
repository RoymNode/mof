const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  products: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      categoryId: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
