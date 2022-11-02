import React, { Component } from 'react'
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate
} from "react-router-dom";
import cookieUtil from 'src/util/cookieUtil';
import { ECookieName } from 'src/util/utilModel';


 function ProtectedRoute({ children }: { children: JSX.Element }) {
  const token = cookieUtil.get(ECookieName.COOKIE_TOKEN);
  
  let auth = !!(token);
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;