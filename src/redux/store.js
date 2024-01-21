import { configureStore } from '@reduxjs/toolkit';
import productSliceReducer from '../redux/productSlice';

export const store = configureStore({
  reducer: {
    product: productSliceReducer,
    
  },
});
