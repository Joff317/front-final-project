import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { value, login, checkLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const loginResponse = await login(e, email, password);
    if (loginResponse === "login ok") {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
