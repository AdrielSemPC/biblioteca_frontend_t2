import { Navigate } from "react-router-dom";
import { getToken, isAdmin } from "./Autenticacao";

const WithAuth = (Component) => {

  const AuthRoute = () => {    
    const isAuth = getToken() ? true : false;
    if (isAuth) {
      return <Component />;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return AuthRoute;
};

export default WithAuth;

export const WithAdmin = (Component) => {
  const AdminRoute = () => {
    const isAuth = getToken() ? true : false;
    if (!isAuth) {
      return <Navigate to="/login" />;
    }

    if (isAdmin()) {
      return <Component />;
    }

    return <Navigate to="/privado" replace />;
  };

  return AdminRoute;
};
