import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addtocart: (state, action) => {
      state.push(action.payload);
      return state;
    },
    removefromcart: (state, action) => {
      return state.filter((product) => product.productId != action.payload);
    },
    setCartFromDb: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export default cartSlice;
export const cartSliceAction = cartSlice.actions;
