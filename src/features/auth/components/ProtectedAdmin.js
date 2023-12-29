import { useSelector } from "react-redux";
import { selectLoggedInUserToken } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUserToken);
  const userInfo = useSelector(selectUserInfo)

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  if (userInfo && userInfo?.role !== 'admin') {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
// bas YES
export default ProtectedAdmin;
