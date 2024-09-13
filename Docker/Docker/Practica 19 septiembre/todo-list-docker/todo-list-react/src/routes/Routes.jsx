import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "../contexts/AuthProvider";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/home", element: <PrivateRoutes route={<Home />} /> },
  { path: "/*", element: <h1>404 Not Found</h1> },
]);

const Routes = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default Routes;
