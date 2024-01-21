import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
  productList: [],
  cartItem: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItems: (state, action) => {
      const total = action.payload.price;
      state.cartItem = [
        ...state.cartItem,
        { ...action.payload, qty: 1, total },
      ];
    },
    deleteCartItem: (state, action) => {
      const updatedCartItems = state.cartItem.filter(
        (item) => item.id !== action.payload
      );

      state.cartItem = [...updatedCartItems];
      // toast(` Item removed from cart`);
    },

    removeCartItem: (state, action) => {
      const updatedCartItems = state.cartItem.filter(
        (item) => item.id !== action.payload
      );

      state.cartItem = [...updatedCartItems];
      // toast(` Item removed from cart`);
    
    },

    increaseQty: (state, action) => {
      console.log(action);
      const { payload: itemId } = action;

      const item = state.cartItem.find((item) => item.id === itemId);

      if (item) {
        item.qty += 1;
      }
    },

    decreaseQty: (state, action) => {
      const { payload: itemId } = action;

      const item = state.cartItem.find((item) => item.id === itemId);

      if (item) {
        item.qty -= 1;
      }
    },
  },
});

export const {
  setData,
  addCartItems,
  deleteCartItem,
  increaseQty,
  decreaseQty,
  removeCartItem
} = productSlice.actions;
export default productSlice.reducer;
