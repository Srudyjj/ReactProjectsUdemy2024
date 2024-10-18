import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { isLoading, user } = useSelector(
    (state: RootState) => state.user.value
  );

  if (isLoading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
