import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      if (!state.find((item) => item.id === action.payload.id)) {
        state.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state));
    },
    removeFromWishlist: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
