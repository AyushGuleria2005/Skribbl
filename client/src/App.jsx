import React from "react";
import Canvas from "./components/Canvas";
import Main from "./components/Main";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/canvas",
      element: (
        <Canvas
          width="900"
          height="500"
          style={{
            background: "#1C1C1C",
            border: "2px solid black"
          }}
        />
      ),
    },
  ]);


const App = () => {
   return (
        <RouterProvider router={appRouter}/>
    )
};

export default App;
