import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import AudiovisualCard from "../audioVisualCard/AudiovisualCard";
import DeleteFavoritePopup from "./popupConfirmation/deletePopup/DeleteFavoritePopup";

const Favorites = () => {
  const { favorites, getFavorite, deleteFavorite } = useContext(AuthContext);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    getFavorite();
  }, []);

  const handleDelete = async (audioVisualId) => {
    await deleteFavorite(audioVisualId);
    setDeletePopup(true);
    setTimeout(() => {
      setDeletePopup(false);
    }, 3000);
  };

  return (
    <>
      <h1 className="sm:text-xl text-lg uppercase h2 mb-6 font-dancing-script">Mes Favoris : </h1>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {favorites &&
          favorites.map((fav) => (
            <AudiovisualCard
              key={fav._id}
              audiovisual={fav}
              deleteFavorite={() => handleDelete(fav._id)}
              favorites={favorites}
            />
          ))}
      </div>

      {deletePopup && <DeleteFavoritePopup />}
    </>
  );
};

export default Favorites;
