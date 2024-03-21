import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
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
        localStorage.setItem("authToken", token);
        setLoggedIn(true);
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
      setLoggedIn(true);
      setToken(storedToken);
    }
  };

  const signup = (e, pseudo, email, password) => {
    e.preventDefault();
    axios
      .post(`${BACK_API_URL}/api/users`, { pseudo, email, password })
      .then((res) => {
        return res.data.token;
      })
      .then((token) => {
        // console.log(res.data.token);
        // setToken(res.data.token);
        localStorage.setItem("authToken", token);
        setLoggedIn(true);
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
    setLoggedIn(false);
  };

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log(storedToken);

    axios
      .get(`${BACK_API_URL}/api/users/uniqueuser`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        console.log("User data retrieved:", res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        value: "AuthValue",
        login,
        isLoggedIn,
        checkLogin,
        token,
        signup,
        logout,
        getUser,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
