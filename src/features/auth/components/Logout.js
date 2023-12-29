import { useEffect } from "react";
import {  selectLoggedInUserToken, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);

  useEffect(() => {
    dispatch(signOutAsync());
  }, []);

  return <>{!user && <Navigate to="/login" replace={true}></Navigate>} </>;
}

export default Logout;
