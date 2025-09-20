const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const productsRouter = require('./Routes/products');
const ordersRouter = require('./Routes/orders');

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

mongoose.connect('mongodb://localhost:27017/shopping', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Shopping API is running 🚀');
});

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌍 Server running at http://localhost:${PORT}`));
