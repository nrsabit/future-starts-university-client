import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);

  return token ? children : <Navigate to={"/login"} replace></Navigate>;
};

export default ProtectedRoute;
