

import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Question/Home/home";
import Login from "./pages/User/Login";
import Register from "./pages/User/Registration";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Question from "./pages/Question/QuestionPage/QuestionPage";
import Answer from "./pages/Answer/Answer";
import HowItWorks from "./pages/HowItWorks/HowItWorks.jsx";
import About from "./pages/About/About.jsx";
import Privacy from "./pages/PrivacyPolicy/PrivacyPolicy.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx"; // Page Not Found component
import { createContext, useEffect, useState } from "react";
import { AuthProvider } from "./Hooks/AuthContext.jsx";
import "./App.css";
import axiosBase from "./axiosConfig.js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx"; // Protected Route component

export const UserLoginInfo = createContext();

function App() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const userData = async () => {
    try {
      const token = localStorage.getItem("user-token");

      if (!token) {
        navigate("/auth");
      }

      const userData = await axiosBase
        .get("/users/check", { headers: { Authorization: "Bearer " + token } })
        .then((response) => response.data);

      setUser(userData);
    } catch (error) {
      console.log(error);
      navigate("/auth");
    }
  };

  useEffect(() => {
    userData();
  }, []);

  return (
    <AuthProvider>
      <UserLoginInfo.Provider value={{ user, setUser }}>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/question"
            element={
              <ProtectedRoute>
                <Question />
              </ProtectedRoute>
            }
          />
          <Route
            path="/answer/:questionID"
            element={
              <ProtectedRoute>
                <Answer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/howitworks"
            element={
              <ProtectedRoute>
                <HowItWorks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/privacy"
            element={
              <ProtectedRoute>
                <Privacy />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </UserLoginInfo.Provider>
    </AuthProvider>
  );
}

export default App;
