import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const state = JSON.parse(localStorage.getItem("state"));

const itemsSlice = createSlice({
    name: "goods",
    initialState: {
        categories: state?.goods?.categories ?? [],
    },
    reducers: {
        addCategory: (state, action) => {
            state.categories.push({
                category: action.payload.category,
                id: action.payload.id,
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
                category.items = category.items.filter(
                    (item) => item.id !== id
                );
            }
        },
        deleteCategory: (state, { payload }) => {
            state.categories = state.categories.filter(
                (item) => item.id !== payload
            );
        },
    },
});

export const { addCategory, addItem, deleteItem, deleteCategory } =
    itemsSlice.actions;
export default itemsSlice.reducer;
