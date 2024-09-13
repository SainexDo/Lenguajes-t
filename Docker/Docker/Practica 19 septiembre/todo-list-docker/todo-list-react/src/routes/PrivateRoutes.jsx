import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoutes = ({ route }) => {
  const { auth } = useContext(AuthContext);
  return auth ? route : <Navigate to="/" />;
};

export default PrivateRoutes;
