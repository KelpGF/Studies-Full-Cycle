import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export function AuthRoute(props: PropsWithChildren) {
  const authContext = useContext(AuthContext);

  if (!authContext.auth) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
