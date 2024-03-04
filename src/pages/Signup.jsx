import React, { useContext, useState } from "react";

import { AuthContext } from "../context/auth.context";
import {
  isValidEmail,
  isValidPassword,
} from "../components/utils/ValisationUtils";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [pseudoError, setPseudoError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pseudo) {
      setPseudoError("Le pseudo doit être rempli.");
      return;
    } else {
      setPseudoError("");
    }

    if (!email.trim() || !isValidEmail(email)) {
      setEmailError("L'email doit être rempli et au format valide.");
      return;
    } else {
       setEmailError("");
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        "Le mot de passe doit avoir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."
      );
      return;
    } else {
      setPasswordError("");
    }

    await signup(e, pseudo, email, password);
  };
  return (
    <div className="h-screen pt-4 w-full flex flex-col items-center justify-center">
      <h1 className="text-2xl uppercase h2 mb-6">Signup Page</h1>
      <form
        className="sm:w-[500px] max-sm:w-[300px]"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="pseudo">
            Pseudo <span className="text-red-700">*</span> :{" "}
          </label>
          <input
            className="input"
            type="text"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
          />
          {pseudoError && <p className="text-red-700">{pseudoError}</p>}
        </div>
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="pseudo">
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
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="pseudo">
            Mot de passe <span className="text-red-700">*</span> :{" "}
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
          <button id="btn" type="submit">
            Créer un compte
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
