import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, quantity, categoryId } = action.payload;
      const existing = state.items.find(item => item.id === id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, name, price, categoryId, quantity });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
