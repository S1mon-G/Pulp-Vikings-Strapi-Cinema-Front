import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout.tsx";
import App from "./App.tsx";
import ActorDetails from "./pages/ActorDetails.tsx";
import MovieDetails from "./pages/MovieDetails.tsx";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/actors/:id",
        element: <ActorDetails />
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(

  <RouterProvider router={router} />

);
