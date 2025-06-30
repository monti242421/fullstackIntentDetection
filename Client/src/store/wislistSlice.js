import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addtowishlist: (state, action) => {
      state.push(action.payload);
    },
    removefromwislist: (state, action) => {
      return state.filter((product) => product.productId != action.payload);
    },
    setWishlistFromDb: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default wishlistSlice;
export const wishlistSliceAction = wishlistSlice.actions;
