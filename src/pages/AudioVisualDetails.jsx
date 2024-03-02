import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCommentary from "../components/audioVisualCommentary/PostCommentary";
import Commentary from "../components/audioVisualCommentary/Commentary";
import { AuthContext } from "../context/auth.context";
import AddFavorites from "../components/favorites/AddFavorites";

const AudioVisualDetails = () => {
  let { id } = useParams();
  const { getCommentary, isLoggedIn, checkLogin, user, getUser } =
    useContext(AuthContext);

  const [audiovisualDetails, setAudioVisualDetails] = useState(null);
  const BACK_API_URL = process.env.API_URL;
  const fetchAudioVisualDetails = () => {
    axios
      .get(`${BACK_API_URL}/api/audiovisual/${id}`)
      .then((res) => {
        console.log(res.data);
        setAudioVisualDetails(res.data.audioVisual);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    checkLogin();
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  // useEffect(() => {
  //   console.log(user.favorites);
  //   // console.log(audiovisualDetails._id);
  //   // console.log(
  //   //   // user.favorites.some((fav) => fav._id === audiovisualDetails.id)
  //   // );
  // }, [user]);

  useEffect(() => {
    fetchAudioVisualDetails();
  }, [id]);

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
