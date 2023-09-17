import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { z } from "zod";

const state = JSON.parse(localStorage.getItem("state"));

const schema = z.object({
    goods: z.object({
        categories: z.array(
            z.object({
                category: z.string(),
                id: z.string().uuid(),
                items: z.array(
                    z.object({
                        amount: z.number().nonnegative(),
                        pricePerItem: z.number().nonnegative(),
                        notes: z.string(),
                        id: z.string().uuid(),
                    })
                ),
            })
        ),
    }),
});

const safeState = schema.safeParse(state);

const itemsSlice = createSlice({
    name: "goods",
    initialState: safeState.success ? safeState.data.goods : { categories: [] },
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
