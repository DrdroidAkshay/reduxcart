import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialstate: {},
  reducers: {},
});
export const cartActions = cartSlice.actions;
export default cartSlice;
