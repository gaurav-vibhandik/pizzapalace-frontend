//================>Approach : Handling Routing using latest method : createBrowserRouter
import React from "react";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import OrderCartPage from "./components/pages/OrderCartPage";
import AdminPage from "./components/pages/AdminPage";
import RootLayout from "./components/pages/RootLayout";
import CheckoutPage from "./components/pages/CheckoutPage";

function App() {
  //=========> Routing using JS object ========
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/home", element: <HomePage /> },
        { path: "/checkout", element: <CheckoutPage /> },
        { path: "/orderCart", element: <OrderCartPage /> },
        { path: "/admin", element: <AdminPage /> },
      ],
    },
  ]);
  //<====================================
  //=========> Routing using Elements=======
  // const routeDefinitions = createRoutesFromElements(
  //   <Route>
  //     <Route path="/" element={<HomePage />} />
  //     <Route path="/orderCart" element={<OrderCartPage />} />
  //   </Route>
  // );
  //const router = createBrowserRouter(routeDefinitions);
  //<====================================
  return (
    <React.Fragment>
      <RouterProvider router={router} />

      <div className="App"></div>
    </React.Fragment>
  );
}

export default App;

//<=============================================
