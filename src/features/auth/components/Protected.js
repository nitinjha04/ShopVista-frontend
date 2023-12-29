import { useSelector } from "react-redux";
import { selectLoggedInUserToken } from "../authSlice";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const user = useSelector(selectLoggedInUserToken);

  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}

export default Protected;
