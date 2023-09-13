# Shopping Assistant App

The **Shopping Assistant** is a web application designed to simplify the process of comparing prices of items within the same category, even when they come in different package sizes. It provides users with a clear view of the price per standard unit (e.g., per kilogram, liter, piece) for easy decision-making while shopping.

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
-   [Usage](#usage)
-   [Technologies Used](#technologies-used)
-   [Contributing](#contributing)
-   [License](#license)

---

## Features

-   **Category Management**: Users can create and delete categories for organizing different types of goods (e.g., fruits, dairy, snacks).

-   **Item Entry**: Within each category, users can add multiple items specifying the quantity and corresponding price, along with optional notes for additional information.

-   **Price Normalization**: The app calculates and displays the price per standard unit for each item, allowing for easy comparison.

-   **Sorting and Filtering**: Items within each category are sorted by price per standard unit, making it simple to identify the most cost-effective option.

-   **User-Friendly Interface**: Built using React and Tailwind, the application offers an intuitive and visually appealing experience.

---

## Getting Started

To get started with the **Shopping Assistant** app, follow these steps:

1. Clone the repository to your local machine:
   git clone https://github.com/vincora/shopping-assistant.git

2. Navigate to the project directory:
   cd shopping-assistant

3. Install the necessary dependencies:
   npm install

4. Start the development server:
   npm start

---

## Usage

1. **Creating a New Category**:

    - Upon opening the app, you'll find a category form at the bottom of the screen. Enter the category name and click on the "Add" button to create it. The app will automatically redirect you inside the category page.

2. **Adding a New Item**:

    - Inside the category page, you'll find a form to add a new item. Enter the quantity (e.g., kilograms, liters, pieces) and corresponding price for the item. Optionally, add notes for additional information. Click on the "Add" button to add the item to the category.

3. **Price Comparison**:

    - The app will automatically calculate and display the price per standard unit for each item.

4. **Sorting and Filtering**:

    - Items within each category are sorted by price per standard unit, allowing for easy comparison.

5. **Navigating Between Pages**:

    - To go back from a category page to the list of categories, simply click on the "Back" button.

6. **Deleting Categories and Items**:
    - On mobile devices, you can delete categories and items by swiping left. On desktop, the delete button will appear when you hover over the element.

## Technologies Used

-   [React](https://reactjs.org/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [React Hook Form](https://react-hook-form.com/)
-   [Redux Toolkit](https://redux-toolkit.js.org/)
-   [React Router 6](https://reactrouter.com/)
-   [Zod](https://github.com/colinhacks/zod)

---

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push to your forked repository.
5. Create a pull request to the original repository.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to reach out if you have any questions or need further assistance. Happy shopping!

_Julia Glagola_
