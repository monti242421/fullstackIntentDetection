import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistSlice from "./wislistSlice";
import productsSlice from "./productsSlice";

const appStore = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    wishlist: wishlistSlice.reducer,
  },
});

export default appStore;
