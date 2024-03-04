import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  isValidPassword,
} from "../components/utils/ValisationUtils";

const Login = () => {
  const { value, login, checkLogin, token } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifiez si l'e-mail est vide ou n'est pas au bon format
    if (!email.trim() || !isValidEmail(email)) {
      setEmailError("L'email doit être rempli et au format valide.");
      return;
    }

    if (password !== "login ok") {
      setPasswordError("Le mot de passe n'est pas correct");
    }

    setEmailError("");
    setPasswordError("");

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
          {emailError && <p className="text-red-700">{emailError}</p>}
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
          {passwordError && <p className="text-red-700">{passwordError}</p>}
        </div>
        <div className="flex justify-center mt-6">
          <button id="btn" className="px-12 w-32" type="submit">
            Login
          </button>
        </div>

        <div className="flex flex-col justify-center items-center mt-6 gap-4">
          <p>Pas encore inscrit ?</p>
          <button
            onClick={() => navigate("/signUp")}
            className="underline"
            id="link"
          >
            Inscrivez-vous
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
