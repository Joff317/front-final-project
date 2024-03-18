import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCommentary from "../../components/audioVisualCommentary/PostCommentary";
import Commentary from "../../components/audioVisualCommentary/Commentary";
import { AuthContext } from "../../context/auth.context";
import AddFavorites from "../../components/favorites/AddFavorites";
import AudioVisualDetailsComp from "../../components/audioVisualDetailsComp/AudioVisualDetailsComp";
import { AudioVisualContext } from "../../context/audiovisual.context";
import { CommentariesContext } from "../../context/commentaries.context";

const AudioVisualDetails = () => {
  let { id } = useParams();
  const {
    // getCommentary,
    isLoggedIn,
    checkLogin,
    user,
    getUser,
    // fetchAudioVisualDetails,
    // audiovisualDetails,
  } = useContext(AuthContext);

  const { getCommentary } = useContext(CommentariesContext);

  const { fetchAudioVisualDetails, audiovisualDetails } =
    useContext(AudioVisualContext);

  // console.log(audiovisualDetails);

  useEffect(() => {
    checkLogin();
    if (isLoggedIn) {
      getUser();
    }
  }, []);

  useEffect(() => {
    fetchAudioVisualDetails(id);
  }, [id]);

  return (
    <div className="min-h-full p-4 flex flex-col items-center mx-auto gap-4">
      <AudioVisualDetailsComp audiovisualDetails={audiovisualDetails} />

      {isLoggedIn && (
        <>
          <div className="commentary px-6 py-3">
            <div>
              {isLoggedIn && (
                <Commentary id={id} updateComments={getCommentary} />
              )}
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
        </>
      )}
    </div>
  );
};

export default AudioVisualDetails;
