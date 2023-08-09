import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import ItemForm from "./components/ItemForm";
import CategoryForm from "./components/CategoryForm";
import Category from "./components/Category";
import { Provider } from "react-redux";
import store from "./store/store";

// / - list of categories
// /<uuid> - list of items inside <uuid> category
// /<uuid>/itemForm - form to add new item in <uuid> category
// /categoryForm - add new category

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <FirstPage />,
            },
            {
                path: "categoryForm",
                element: <CategoryForm />,
            },
            {
                path: "category/:categoryId",
                element: <Category />,
            },
            {
                path: "category/:categoryId/itemForm",
                element: <ItemForm />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
