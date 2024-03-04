import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCommentary from "../components/audioVisualCommentary/PostCommentary";
import Commentary from "../components/audioVisualCommentary/Commentary";
import { AuthContext } from "../context/auth.context";
import AddFavorites from "../components/favorites/AddFavorites";

const AudioVisualDetails = () => {
  let { id } = useParams();
  const {
    getCommentary,
    isLoggedIn,
    checkLogin,
    user,
    getUser,
    fetchAudioVisualDetails,
    audiovisualDetails,
  } = useContext(AuthContext);

  console.log(audiovisualDetails);

  useEffect(() => {
    checkLogin();
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  useEffect(() => {
    // if (audiovisualDetails && audiovisualDetails.id) {
    //   fetchAudioVisualDetails(audiovisualDetails.id);
    // }
    fetchAudioVisualDetails(id);
  }, []);

  return (
    <div className="min-h-full pt-4 w-full flex flex-col justify-center items-center">
      <h1 className="text-black text-4xl mb-8 text-center font-pacifico">
        {audiovisualDetails && audiovisualDetails.title}
      </h1>
      <p>{audiovisualDetails && audiovisualDetails.synopsis}</p>

      <div>
        {isLoggedIn && <Commentary id={id} updateComments={getCommentary} />}
      </div>

      <div>
        {isLoggedIn && (
          <PostCommentary id={id} updateComments={getCommentary} />
        )}
      </div>

      <div className="mt-6">
        {isLoggedIn &&
        user.favorites &&
        user.favorites.some((fav) => fav._id === audiovisualDetails._id) ? (
          <p>Film déjà présent dans vos favoris</p>
        ) : isLoggedIn ? (
          <AddFavorites id={id} />
        ) : null}
      </div>
    </div>
  );
};

export default AudioVisualDetails;
