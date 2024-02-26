import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import {
  TUserPayload,
  logOut,
  selectCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  const dispatch = useAppDispatch();
  let user;

  if (token) {
    user = verifyToken(token) as TUserPayload;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to={"/login"} replace></Navigate>;
  }

  return token ? children : <Navigate to={"/login"} replace></Navigate>;
};

export default ProtectedRoute;
