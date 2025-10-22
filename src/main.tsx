import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout.tsx";
import App from "./App.tsx";
import ActorDetails from "./pages/ActorDetails.tsx";
import MovieDetails from "./pages/MovieDetails.tsx";
import AuthPage from "./components/Auth/AuthPage.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
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
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  
);