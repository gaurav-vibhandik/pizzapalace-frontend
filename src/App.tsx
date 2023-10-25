//Approach : Handling Routing using latest method : createBrowserRouter
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

function App() {
  //=========> Routing using JS object ========
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/orderCart", element: <OrderCartPage /> },
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

      <div className="App">
        {/* <HomePage /> */}
        {/* <Demo /> */}
      </div>

      {/* Old approach : 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/orderCart" element={<OrderCartPage />} />
        </Routes>
      </BrowserRouter> */}
    </React.Fragment>
  );
}

export default App;

// Approach 1 : Handling Routing using Old Approach
// import React from "react";
// import "./App.css";
// import HomePage from "./components/pages/HomePage";
// import {
//   BrowserRouter,
//   Route,
//   RouterProvider,
//   Routes,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import OrderCartPage from "./components/pages/OrderCartPage";

// function App() {
//   //=========> Routing using JS object ========
//   // const router = createBrowserRouter([
//   //   { path: "/", element: <HomePage /> },
//   //   { path: "/orderCart", element: <OrderCartPage /> },
//   // ]);
//   //<====================================
//   //=========> Routing using Elements=======
//   const routeDefinitions = createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/orderCart" element={<OrderCartPage />} />
//     </Route>
//   );
//   const router = createBrowserRouter(routeDefinitions);
//   //<====================================
//   return (
//     <React.Fragment>
//       <RouterProvider router={router} />

//       <div className="App">
//         {/* <HomePage /> */}
//         {/* <Demo /> */}
//       </div>

//       {/* Old approach :
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/orderCart" element={<OrderCartPage />} />
//         </Routes>
//       </BrowserRouter> */}
//     </React.Fragment>
//   );
// }

// export default App;
