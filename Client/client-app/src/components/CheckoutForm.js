import React, { useState } from 'react';

const CheckoutForm = ({ onCheckout }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCheckout({ name, address });
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h3>💳 פרטי הזמנה</h3>
      <div className="form-group">
        <label>שם מלא:</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>כתובת:</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-success">
        אשר הזמנה
      </button>
    </form>
  );
};

export default CheckoutForm;
