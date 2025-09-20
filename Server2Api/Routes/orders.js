const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');


router.post('/', async (req, res) => {
  try {
    const { name, address, email, products } = req.body;

   
    if (!name || !address || !email || !products || products.length === 0) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = new Order({ name, address, email, products });
    await order.save();

    res.status(201).json({ message: 'Order saved successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;