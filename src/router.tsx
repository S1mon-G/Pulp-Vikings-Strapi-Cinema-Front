import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./App";
import ActorDetails from "./pages/ActorDetails";
import MovieDetails from "./pages/MovieDetails";
import AuthPage from "./components/Auth/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Structure :
//- /auth : Page publique de connexion/inscription
// - /* : Toute les autres routes sont protégées par ProtectedRoute

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/actors/:id",
        element: <ActorDetails />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);
