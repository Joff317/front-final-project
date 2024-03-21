import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const FavoritesContext = createContext();

function FavoritesProviderWrapper(props) {
  const [favorites, setFavorites] = useState([]);
  const [addFavorite, setAddFavorite] = useState();
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();
  const BACK_API_URL = process.env.API_URL;

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
         //Ici on met à jour la nouvelle liste filtré, donc ce qui retire l'audiovisuel des favs
        setFavorites((prevFav) =>
          prevFav.filter((fav) => fav._id !== audioVisualId)
        );
        setShowNotification(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <FavoritesContext.Provider
      value={{
        value: "FavoritesValue",
        addAudioVisualsToFavorites,
        addFavorite,
        getFavorite,
        favorites,
        deleteFavorite,
      }}
    >
      {props.children}
    </FavoritesContext.Provider>
  );
}

export { FavoritesContext, FavoritesProviderWrapper };
