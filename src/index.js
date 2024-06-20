import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./icomoon/style.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FirstPage from "./components/pages/FirstPage";
import CategoryPage from "./components/pages/CategoryPage";
import { Provider } from "react-redux";
import store from "./store/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./i18n";


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

serviceWorkerRegistration.register();
