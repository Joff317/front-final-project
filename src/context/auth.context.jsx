import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [audioVisuals, setAudioVisuals] = useState([]);
  const [allAudioVisuals, setAllAudioVisuals] = useState([]);
  const [audiovisualDetails, setAudioVisualDetails] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [comments, setComments] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [addFavorite, setAddFavorite] = useState();
  const [updateComments, setUpdateComments] = useState();
  const [showNotification, setShowNotification] = useState(false);
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

  const fetchAudioVisualDetails = (id) => {
    axios
      .get(`${BACK_API_URL}/api/audiovisual/${id}`)
      .then((res) => {
        // console.log(res.data);
        setAudioVisualDetails(res.data.audioVisual);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getFilteredAudioVisuals = (query) => {
    return axios
      .get(`${BACK_API_URL}/api/audiovisual/filtered/mixed`, {
        params: query,
      })
      .then((response) => {
        console.log(
          "Filtered AudioVisuals Response:",
          response.data.audioVisuals
        );
        setAllAudioVisuals(response.data.audioVisuals);
        return response.data.audioVisuals;
      })
      .catch((error) => {
        console.error("Error fetching filtered audiovisuals: ", error);
      });
  };

  const searchAudioVisuals = (query) => {
    console.log("Search Data", query);
    if (query !== "") {
      axios
        .get(`${BACK_API_URL}/api/audiovisual/searchbar/search?query=${query}`)
        .then((res) => {
          console.log("Search Results:", res.data.audioVisuals);
          setAllAudioVisuals(res.data.audioVisuals);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAudioVisuals();
    }
  };

  const addAudioVisualsToFavorites = (audioVisualId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .post(
        `${BACK_API_URL}/api/users/addFavorite/${audioVisualId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((res) => {
        console.log("favoris ajouté");
        setShowNotification(true);
      })
      .catch((err) => console.log(err));
  };

  const getFavorite = () => {
    const storedToken = localStorage.getItem("authToken");
    return axios
      .get(`${BACK_API_URL}/api/users/favorites`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFavorites(res.data.favorite);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des favoris :", error);
        throw error;
      });
  };

  const deleteFavorite = (audioVisualId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${BACK_API_URL}/api/users/removeFavorite/${audioVisualId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        setFavorites((prevFav) =>
          prevFav.filter((fav) => fav._id !== audioVisualId)
        );
        setShowNotification(true);
      })
      .catch((err) => console.log(err));
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
        console.log("COMMENTARYYYYY", res.data);
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
        console.log(res.data.data);
        console.log("Commeeeeeents", comments);
        const result = comments.map((comment) => {
          if (comment._id === res.data.data._id) {
            return res.data.data;
          } else {
            return comment;
          }
        });
        setComments(result);
        //   setComments([...comments, res.data.data]);
        return "Commentary updated";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCommentary = (audioVisualId, commentId) => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${BACK_API_URL}/api/commentary/${audioVisualId}/${commentId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const deleteComment = comments.filter(
          (comment) => comment._id !== commentId
        );
        setComments(deleteComment);
        return "Comment deleted";
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
        setAllAudioVisuals,
        getAudioVisuals,
        fetchAudioVisualDetails,
        audiovisualDetails,
        getCommentary,
        comments,
        createCommentary,
        postComments,
        updateCommentary,
        updateComments,
        deleteCommentary,
        getFilteredAudioVisuals,
        searchAudioVisuals,
        addAudioVisualsToFavorites,
        addFavorite,
        getFavorite,
        favorites,
        deleteFavorite,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
