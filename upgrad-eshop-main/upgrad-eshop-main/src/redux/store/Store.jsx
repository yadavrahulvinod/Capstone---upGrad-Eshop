// store.js
import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../reducer_functions/AuthSlice';
import ProductSlice from '../reducer_functions/ProductSlice';
import AddressSlice from '../reducer_functions/AddressSlice';



const Store = configureStore({
  reducer: {
    auth: AuthSlice,
    products: ProductSlice,
    address : AddressSlice
  },
});

export default Store

