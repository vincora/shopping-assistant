import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      state.items.push({
        amount: action.payload.amount,
        pricePerItem: action.payload.pricePerItem,
        pricePerUnit: (+action.payload.pricePerItem / +action.payload.amount).toFixed(2),
        notes: action.payload.notes,
      });
    },
  },
});

export const { addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
