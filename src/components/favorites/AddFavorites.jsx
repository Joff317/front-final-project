import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const AddFavorites = (props) => {
  const { addAudioVisualsToFavorites, checkLogin } = useContext(AuthContext);
  console.log(addAudioVisualsToFavorites);

  useEffect(() => {
    checkLogin();
  }, []);

  const handleFavorite = async () => {
    const audioVisualId = props.id;
    await addAudioVisualsToFavorites(audioVisualId);
  };
  return (
    <>
      <button onClick={() => handleFavorite()} id="btn">
        Add to favorite
      </button>
    </>
  );
};

export default AddFavorites;
