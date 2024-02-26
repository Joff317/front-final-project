import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import AudioVisualForm from "../components/audiovisualForm/AudioVisualForm";

const CreateAudiovisual = () => {
  const { token, createAudioVisuals, isLoggedIn, checkLogin } =
    useContext(AuthContext);

  //   categorie, synopsis, title, genre, author, date, image
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <h3>You must be login to see AudioVisuals </h3>
        <button onClick={() => navigate("/")}>Go to login page</button>
      </div>
    );
  }

  return (
    <div className="min-h-full pt-4 w-full flex flex-col items-center justify-center gap-4 ">
      <h2 className="text-xl uppercase audiovisual-h2">
        Créer un film, série ou animé
      </h2>

      <AudioVisualForm />
    </div>
  );
};

export default CreateAudiovisual;
