// Redux Toolkit Imports
import { createSlice } from "@reduxjs/toolkit";

const getCartTimes = () => {
  const localStorageItem = localStorage.getItem("cartTime");
  if (localStorageItem) {
    return JSON.parse(localStorageItem);
  } else {
    return null;
  }
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartTime: getCartTimes(),
  },

  reducers: {
    setCartTime(state, action) {
      state.cartTime = action.payload;
    },
  },
});

export const { setCartTime } = cartSlice.actions;
export default cartSlice.reducer;

export const selectedCartTime = (state) => state.cart.cartTime;
