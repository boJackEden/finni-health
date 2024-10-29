import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const ProtectedWrapper = ({children}: {children: React.ReactNode}) => {
  const { user } = useContext(AuthContext);
  if (user === undefined) {
    return <Navigate to='/login' />
  } else {
    return (
      <>
       {children}
      </>
    );
  }
}