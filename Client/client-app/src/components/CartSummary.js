import React from 'react';

const CartSummary = ({ cart }) => {
  return (
    <div className="cart-summary">
      <h3>🛒 עגלת קניות</h3>
      {cart.length === 0 ? (
        <p>העגלה ריקה</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ₪{item.price} × {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <h4>סה״כ: ₪{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h4>
    </div>
  );
};

export default CartSummary;
