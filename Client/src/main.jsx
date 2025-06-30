import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/protectedRoutes/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./routes/protectedRoutes/Home";
import Orders from "./routes/protectedRoutes/Orders";
import Products from "./routes/protectedRoutes/Products";
import Cart from "./routes/protectedRoutes/Cart";
import Wishlist from "./routes/protectedRoutes/Wishlist";
import SignUp from "./routes/publicRoutes/SignUp";
import Login from "./routes/publicRoutes/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import appStore from "./store";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <SignUp></SignUp>,
  },
  {
    element: <ProtectedRoute></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <App></App>,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/Orders",
            element: <Orders />,
          },
          {
            path: "/Products",
            element: <Products />,
          },
          {
            path: "/Cart",
            element: <Cart />,
          },
          {
            path: "/Wishlist",
            element: <Wishlist />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
