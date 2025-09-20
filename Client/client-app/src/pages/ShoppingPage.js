import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';

export default function ShoppingPage({ onNext }) {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { items: categories, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const res = await fetch(
        `https://localhost:7271/api/v1/Products/products?categoryId=${categoryId}`
      );
      if (!res.ok) throw new Error('שגיאה בטעינת מוצרים');
      const data = await res.json();
      setProductsByCategory(data);
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setProductsByCategory([]);
    }
  };

  return (
    <div className="container" dir="rtl">
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        🛒 רשימת קניות
      </h1>

      <div className="form-group">
        <label>קטגוריה:</label>
        <select
          className="form-control"
          value={selectedCategory}
          onChange={(e) => {
            const catId = e.target.value;
            setSelectedCategory(catId);
            setSelectedProduct(null);
            if (catId) {
              fetchProductsByCategory(catId);
            } else {
              setProductsByCategory([]);
            }
          }}
        >
          <option value="">בחר...</option>
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option disabled>אין קטגוריות זמינות</option>
          )}
        </select>
      </div>

      {selectedCategory && productsByCategory.length > 0 && (
        <div className="form-group">
          <label>מוצר:</label>
          <select
            className="form-control"
            value={selectedProduct ? selectedProduct.id : ''}
            onChange={(e) => {
              const product = productsByCategory.find(
                (p) => p.id === Number(e.target.value)
              );
              setSelectedProduct(product || null);
            }}
          >
            <option value="">בחר...</option>
            {productsByCategory.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} - ₪{p.price}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedProduct && (
        <div className="form-group">
          <label>כמות:</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              className="form-control"
              style={{ width: '100px' }}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch(addToCart({ ...selectedProduct, quantity }));
                setQuantity(1);
                alert(`המוצר "${selectedProduct.name}" נוסף לעגלה ✅`);
              }}
            >
              הוסף לעגלה
            </button>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button className="btn btn-success" onClick={onNext}>
          המשך להזמנה ➡️
        </button>
      </div>
    </div>
  );
}
