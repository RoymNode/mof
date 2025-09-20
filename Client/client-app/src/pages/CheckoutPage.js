import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../features/cart/cartSlice';

export default function CheckoutPage() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: '', address: '', email: '' });

  const handleSubmit = async () => {
    if (!form.name || !form.address || !form.email) {
      alert('יש למלא את כל השדות');
      return;
    }

    const order = { ...form, products: cart };

    const res = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });

    if (res.ok) {
      alert('הזמנה נשמרה בהצלחה!');
      dispatch(clearCart());
    } else {
      alert('שגיאה בשליחת ההזמנה');
    }
  };

  return (
    <div className="container">
      <h1>סיכום הזמנה 📝</h1>

      <div className="form-group">
        <label>שם מלא:</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>כתובת:</label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>אימייל:</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>

      <h2>מוצרים בסל:</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} × {item.quantity} (₪{item.price})
          </li>
        ))}
      </ul>

      <div style={{ textAlign: 'center' }}>
        <button onClick={handleSubmit}>אשר הזמנה ✅</button>
      </div>
    </div>
  );
}
