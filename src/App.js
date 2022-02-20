import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Home from "./pages/Home";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setData(token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!data && <Route path="/login" element={<SignIn />}></Route>}
        {data && <Route path="/" element={<Home />} />}
        <Route path="*" element={<Navigate to={data ? "/" : "/login"} />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
