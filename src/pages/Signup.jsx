import React, { useContext, useState } from "react";

import { AuthContext } from "../context/auth.context";
import navigate from "navigate";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");

  const handleSubmit = async (e) => {
    const signupResponse = await signup(e, pseudo, email, password);
    if (signupResponse === "signup ok") {
      navigate("/dashboard");
    }
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
