import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import AddFavoritePopup from "./popupConfirmation/addPopup/AddFavoritePopup";
import { FavoritesContext } from "../../context/favorites.context";

const AddFavorites = (props) => {
  const { checkLogin } = useContext(AuthContext);

  const { addAudioVisualsToFavorites } = useContext(FavoritesContext);
  //   console.log(addAudioVisualsToFavorites);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    checkLogin();
  }, []);

  const handleFavorite = async () => {
    const audioVisualId = props.id;
    await addAudioVisualsToFavorites(audioVisualId);
    setShowNotification(true);
  };

  setTimeout(() => {
    setShowNotification(false);
  }, 3000);

  return (
    <>
      <button onClick={() => handleFavorite()} id="btn">
        Add to favorite
      </button>

      {showNotification && <AddFavoritePopup />}
    </>
  );
};

export default AddFavorites;
