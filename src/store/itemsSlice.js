import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    categories: [],
    currentCategory: "",
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
  },

  // deleteItem: (state, action) => {
  //   state.items = state.items.filter((item) => item.id !== action.payload);
  // },
});

export const { addCategory, addItem } = itemsSlice.actions;
export default itemsSlice.reducer;
