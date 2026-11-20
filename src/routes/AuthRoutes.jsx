import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <>
      {sessionStorage.getItem("isLoggedIn") === "true" ? (
        <Outlet />
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default AuthRoutes;
