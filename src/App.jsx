import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import { userLoggedIn } from "./features/auth/authSlice";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Bill from "./pages/Bill";

function App() {
  const [init, setInit] = useState(true);
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setInit(false);
    const userInfo = JSON.parse(localStorage.getItem("auth"));
    if (userInfo) {
      dispatch(userLoggedIn(userInfo));
    }
  }, [dispatch]);

  if (init) return "";

  if (!accessToken) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Bill />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
