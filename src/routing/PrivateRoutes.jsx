import { Navigate, useLocation } from "react-router-dom";
import { authAtom } from "../store/atoms/authAtom";
import { useRecoilValue } from "recoil";

const PrivateRoute = ({ children }) => {
  const auth = useRecoilValue(authAtom);
  const location = useLocation();

  return auth?.accessToken ? ( children ) : ( <Navigate to="/signin" state={{ from: location }} replace /> );
};

export default PrivateRoute;