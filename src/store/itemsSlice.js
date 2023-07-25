import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, { payload: { amount, pricePerItem, notes } }) => {
      state.items.push({
        amount,
        pricePerItem,
        notes,
        id: v4(),
      });
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
