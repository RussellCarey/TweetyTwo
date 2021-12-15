import { useContext, useEffect, useState } from "react";
import "./styles/global.css";
import LoginView from "./views/login-view/login-view";
import MainView from "./views/main/main-view";
import * as Cookies from "js-cookie";
import AuthContext from "./context/auth/AuthContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const authContext = useContext(AuthContext);
  const { getUserData } = authContext;

  useEffect(() => {
    if (Cookies.get("token")) {
      getUserData();
    }
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/dashboard" element={<MainView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
