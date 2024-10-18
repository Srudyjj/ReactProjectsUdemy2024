import { useEffect } from "react";
import useSubscriptions from "../hooks/useSubscriptions";
import { Navigate } from "react-router-dom";

function PlansManagePage() {
  const [{ data, error, loading }, fetchSubscriptions] = useSubscriptions();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  if (loading) return <div>Loading</div>;

  if (!data && !error && !loading) {
    return <Navigate to="/plans" />;
  }

  return <div>PlansManagePage</div>;
}

export default PlansManagePage;
