import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const BACK_API_URL = process.env.API_URL;

  const login = async (e, email, password) => {
    e.preventDefault();
    axios
      .post(`${BACK_API_URL}/api/users/signin`, { email, password })
      .then((res) => {
        return res.data.token;
      })
      .then((token) => {
        console.log(token);
        navigate("/dashboard", { state: { token: token } });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   On va vérifier la présence d'un token d'authentification dans le local storage, si il y est on met à jour le token
  const checkLogin = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  };

  const signup = (e, pseudo, email, password) => {
    e.preventDefault();
    axios
      .post(`${BACK_API_URL}/api/users`, { pseudo, email, password })
      .then((res) => {
        console.log(res.data.token);
        setToken(res.data.token);
        navigate("/dashboard", { state: { token: token } });
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

  const logout = (event) => {
    event.preventDefault();
    setToken("");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        value: "AuthValue",
        login,
        checkLogin,
        token,
        signup,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
