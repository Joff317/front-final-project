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
    <div>
      <h1>Signup Page</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="pseudo">Pseudo: </label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="pseudo">Email: </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="pseudo">Mot de passe: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Créer un compte</button>
      </form>
    </div>
  );
};

export default Signup;
