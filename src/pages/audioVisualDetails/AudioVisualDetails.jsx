import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCommentary from "../../components/audioVisualCommentary/PostCommentary";
import Commentary from "../../components/audioVisualCommentary/Commentary";
import { AuthContext } from "../../context/auth.context";
import AddFavorites from "../../components/favorites/AddFavorites";
import "./audioVisualDetails.css";

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

  // console.log(audiovisualDetails);

  useEffect(() => {
    checkLogin();
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  useEffect(() => {
    fetchAudioVisualDetails(id);
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      "fr-FR",
      options
    );
    return formattedDate;
  };

  return (
    <div className="min-h-full p-4 flex flex-col items-center mx-auto gap-4">
      <h1 className="text-4xl mb-8 text-center audiovisual-title">
        {audiovisualDetails && audiovisualDetails.title}
      </h1>

      <div className="max-w-[700px] rounded-sm mb-2">
        <img
          className="rounded-xl"
          src={audiovisualDetails && audiovisualDetails.image}
          alt=""
        />
      </div>

      <div className="flex flex-col mt-3 mb-3">
        <h3 className="text-center uppercase audiovisual-title text-2xl">
          Genres :
        </h3>
        <ul className="genre-list p-2 mt-2 text-xl flex flex-row max-sm:flex-col">
          {audiovisualDetails &&
            audiovisualDetails.genre &&
            audiovisualDetails.genre.map((genre, index) => (
              <li
                id="list"
                className="max-sm:my-2 px-3 py-2 mx-2 rounded-xl"
                key={index}
              >
                {genre}
              </li>
            ))}
        </ul>
      </div>

      <div className="px-2 mb-3 flex flex-col">
        <h3 className="audiovisual-title uppercase text-2xl text-center mb-2">
          Synopsis :
        </h3>
        <p className="text-xl px-2">
          {audiovisualDetails && audiovisualDetails.synopsis}
        </p>
      </div>

      <div className="card-details px-4 py-2 mb-3 text-xl md:grid md:grid-cols-2 gap-8">
        <div className="flex flex-row gap-2">
          <h3 className="audiovisual-title">Catégorie :</h3>
          <p>{audiovisualDetails && audiovisualDetails.categorie}</p>
        </div>
        <div className="flex flex-row  gap-2">
          <h3 className="audiovisual-title">Autheur :</h3>
          <p>{audiovisualDetails && audiovisualDetails.author}</p>
        </div>
        <div className="flex flex-row gap-2">
          <h3 className="audiovisual-title">Date de sortie :</h3>
          <p>{formatDate(audiovisualDetails && audiovisualDetails.date)}</p>
        </div>
        <div className="flex flex-row gap-2">
          <h3 className="audiovisual-title">Durée :</h3>
          <p>{audiovisualDetails && audiovisualDetails.duration} mn</p>
        </div>
      </div>
      <div className="commentary px-6 py-3">
        <div>
          {isLoggedIn && <Commentary id={id} updateComments={getCommentary} />}
        </div>

        <div>
          {isLoggedIn && (
            <PostCommentary id={id} updateComments={getCommentary} />
          )}
        </div>
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
