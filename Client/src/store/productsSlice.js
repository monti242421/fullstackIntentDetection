import { createSlice, current } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    feturedProducts: [],
    Products: [],
    Filters: [],
    searchQuery: null,
    fetchNewSearchResults: true,
    currentPage: 1,
    pageSize: 9,
  },
  reducers: {
    addtofeturedProducts: (state, action) => {
      state.feturedProducts = action.payload;
      // console.log(state.feturedProducts);
    },

    addtoProducts: (state, action) => {
      state.Products = action.payload;
    },
    addtoFilters: (state, action) => {
      state.Filters = action.payload;
    },
    searchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    activateNewSearch: (state, action) => {
      state.fetchNewSearchResults = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export default productsSlice;
export const productsSliceAction = productsSlice.actions;
