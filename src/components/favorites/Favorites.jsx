import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import AudiovisualCard from "../audioVisualCard/AudiovisualCard";

const Favorites = () => {
  const { favorites, getFavorite, deleteFavorite } = useContext(AuthContext);

  useEffect(() => {
    getFavorite();
  }, []);

  return (
    <div>
      <h1>Vos Favoris : </h1>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {favorites &&
          favorites.map((fav) => (
            <AudiovisualCard
              key={fav._id}
              audiovisual={fav}
              deleteFavorite={deleteFavorite}
              favorites={favorites}
            />
          ))}
      </div>
    </div>
  );
};

export default Favorites;
