import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { value, login, checkLogin, token } = useContext(AuthContext);
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
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="h-screen pt-4 w-full flex flex-col items-center justify-center">
      <h2 className="text-2xl uppercase h2 mb-6">Login Page</h2>
      <form
        className="sm:w-[500px] max-sm:w-[300px]"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="email">
            Email <span className="text-red-700">*</span> :{" "}
          </label>
          <input
            className="input"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">
            Password <span className="text-red-700">*</span> :{" "}
          </label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center mt-6">
          <button id="btn" className="px-12 w-32" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
