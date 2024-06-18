# Shopping Assistant App

The **Shopping Assistant** is a web application designed to simplify the process of comparing prices of items within the same category, even when they come in different package sizes. It provides users with a clear view of the price per standard unit (e.g., per kilogram, liter, piece) for easy decision-making while shopping. The application supports both English and Russian languages.

## Table of Contents

-   [Features](#features)
-   [Usage](#usage)
-   [Technologies Used](#technologies-used)

---

## Features

-   **Category Management**: Users can create and delete categories for organizing different types of goods (e.g., fruits, dairy, snacks).

-   **Item Entry**: Within each category, users can add multiple items specifying the quantity and corresponding price, along with optional notes for additional information.

-   **Item Notes with Hyperlinks**: When adding a new item, users can include notes that may contain links to online stores. These links are automatically transformed into shortened clickable formats for user convenience.

-   **Price Normalization**: The app calculates and displays the price per standard unit for each item, allowing for easy comparison.

-   **Sorting**: Items within each category are sorted by price per standard unit, making it simple to identify the most cost-effective option.

-   **Total Price Difference Mode:** A mode that shows the difference in total price between sorted items and the most cost-effective option in the category. Because the most cost-effective option might mean that you need to buy a very big package and spend much more money in total. So you can make a decision whether you need a large package at the best price per unit or if opting for a smaller package at a slightly higher unit price would be more cost-effective overall.

-   **User-Friendly Interface**: Built using React and Tailwind, the application offers an intuitive and visually appealing experience.

---

## Usage

1. **Creating a New Category**:

    - Upon opening the app, you'll find a category form at the bottom of the screen. Enter the category name and click on the "Add" button to create it. The app will automatically redirect you inside the category page.

2. **Adding a New Item**:

    - Inside the category page, you'll find a form to add a new item. Enter the quantity (e.g., kilograms, liters, pieces) and corresponding price for the item. Optionally, add notes for additional information. You can write text and paste a hyperlink to an online store if needed (it will be automatically transformed into a clickable format for easy access). Click on the "Add" button to add the item to the category.

3. **Price Comparison**:

    - The app will automatically calculate and display the price per standard unit for each item.

4. **Sorting and Filtering**:

    - Items within each category are sorted by price per standard unit, allowing for easy comparison.

5. **Total Price Difference Mode**:

    - Enable the Total Price Difference Mode to see the difference in total price between items sorted by price per standard unit (e.g., per kilogram, liter). This mode can be toggled from the button in the top left corner, helping users understand how much more or less expensive each item is compared to the most cost-effective option in the category.

6. **Navigating Between Pages**:

    - To go back from a category page to the list of categories, simply click on the "Back" button.

7. **Deleting Categories and Items**:
    - On mobile devices, you can delete categories and items by swiping left. On desktop, the delete button will appear when you hover over the element.

## Technologies Used

-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [React Router 6](https://reactrouter.com/)
-   [Zod](https://zod.dev/)
-   [i18n](https://www.i18next.com/)
