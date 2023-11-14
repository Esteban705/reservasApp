import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Login } from "../components/login/Login";
import { obtenerLogin } from "../components/habitaciones/querys";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (value: any) => {
    const getCredential = await obtenerLogin();
    const { name, password } = getCredential[0];

    if (name === value.name && password === value.password) {
      localStorage.setItem("isAdmin", JSON.stringify({ isAdmin: true }));
      setIsLogin(false);
      navigate("/");
    } else {
      setIsLogin(true);
    }
  };

  return (
    <>
      <Login handleSubmit={handleSubmit} isLogin={isLogin} />
    </>
  );
};
