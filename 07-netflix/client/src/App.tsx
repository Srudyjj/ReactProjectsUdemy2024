import { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

function App() {
  const { fetchUser } = useAuth();
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
