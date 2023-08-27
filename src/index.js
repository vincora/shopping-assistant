import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./icomoon/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import CategoryPage from "./components/CategoryPage";
import { Provider } from "react-redux";
import store from "./store/store";

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
                path: "category/:categoryId",
                element: <CategoryPage />,
            },
        ],
    },
]);

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("state", JSON.stringify(state));
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
