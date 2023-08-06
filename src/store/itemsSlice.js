import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    categories: [],
  },
  reducers: {
    addCategory: (state, action) => {
      state.categories.push({
        category: action.payload,
        id: v4(),
        items: [],
      });
    },
    addItem: (
      state,
      {
        payload: {
          categoryId,
          item: { amount, pricePerItem, notes },
        },
      }
    ) => {
      for (let category of state.categories) {
        if (category.id !== categoryId) {
          continue;
        }
        category.items.push({
          amount,
          pricePerItem,
          notes,
          id: v4(),
        });
      }
    },
    deleteItem: (
      state,
      {
        payload: {
          categoryId,
          item: { id },
        },
      }
    ) => {
      for (let category of state.categories) {
        if (category.id !== categoryId) {
          continue;
        }
        category.items = category.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addCategory, addItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
