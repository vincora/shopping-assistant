import { createSelector } from "@reduxjs/toolkit";

export const selectCategoriesWithSortedItems = createSelector(
    [(state) => state.goods.categories],
    (categories) => {
        return categories.map((category) => {
            const sortedItems = [...category.items].sort(
                (a, b) =>
                    a.pricePerPackage / a.amount - b.pricePerPackage / b.amount
            );
            return {
                ...category,
                items: sortedItems,
            };
        });
    }
);

export const selectCategoryWithPricePerUnit = createSelector(
    [selectCategoriesWithSortedItems],
    (categories) => {
        return categories.map((category) => {
            const itemsWithPricePerUnit = category.items.map((item) => {
                return {
                    ...item,
                    pricePerUnit: item.pricePerPackage / item.amount,
                };
            });
            return {
                ...category,
                items: itemsWithPricePerUnit
            }
        });
    }
);

export const selectCategoriesWithSortedItemsAndBestDeal = createSelector(
    [selectCategoryWithPricePerUnit],
    (categories) => {
        return categories.map((category) => {
            return { ...category, bestDeal: category.items[0] };
        });
    }
);
