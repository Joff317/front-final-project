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
      <div className="h-screen pt-4 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl uppercase h2 mb-4 text-center p-2">
          {" "}
          Vous devez être connecté pour créer un audiovisuel{" "}
        </h2>
        <button id="btn" onClick={() => navigate("/login")}>
          Go to login page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full pt-4 w-full flex flex-col items-center justify-center gap-4 mb-4">
      <h2 className="text-xl uppercase h2 font-dancing-script">Créer un film, série ou animé</h2>
      <AudioVisualForm />
    </div>
  );
};

export default CreateAudiovisual;
