import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [audioVisuals, setAudioVisuals] = useState([]);
  const [allAudioVisuals, setAllAudioVisuals] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [updateComments, setUpdateComments] = useState();
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
        console.log(res.data.token);
        setToken(res.data.token);
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
    setLoggedIn(false);
    localStorage.removeItem("authToken");
  };

  const getUser = () => {
    const storedToken = localStorage.getItem("authToken");

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

  const createAudioVisuals = (
    userToken,
    categorie,
    synopsis,
    title,
    genre,
    author,
    date,
    image,
    duration
  ) => {
    axios
      .post(
        `${BACK_API_URL}/api/audiovisual/`,
        { categorie, synopsis, title, genre, author, date, image, duration },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setAudioVisuals(res.data.audioVisuals);
        return "Audiovisual created";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAudioVisuals = () => {
    axios
      .get(`${BACK_API_URL}/api/audiovisual/`)
      .then((res) => {
        console.log(res.data);
        setAllAudioVisuals(res.data.audioVisuals);
      })
      .catch((error) => {
        console.log("Get audiovisual Failed : ", error.message);
      });
  };

  const getCommentary = async (audioVisualId) => {
    console.log("getCommentary", audioVisualId);
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${BACK_API_URL}/api/commentary/${audioVisualId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.comments);
        setComments(res.data.comments);
      })
      .catch((err) => console.log(err));
  };

  const createCommentary = (audioVisualId, text) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(
        `${BACK_API_URL}/api/commentary/${audioVisualId}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPostComments(res.data);
        return "Commentary posted";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCommentary = (audioVisualId, commentId, text) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .put(
        `${BACK_API_URL}/api/commentary/${audioVisualId}/${commentId}`,
        {
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUpdateComments(res.data.updatedCommentary);
        return "Commentary updated";
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
        createAudioVisuals,
        audioVisuals,
        allAudioVisuals,
        getAudioVisuals,
        getCommentary,
        comments,
        createCommentary,
        postComments,
        updateCommentary,
        updateComments,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
