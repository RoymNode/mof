const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const products = req.body; 

    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Request body must be an array of products' });
    }

    const result = await Product.insertMany(products, { ordered: false });
    res.status(201).json(result);

  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Duplicate product id found' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

module.exports = router;
