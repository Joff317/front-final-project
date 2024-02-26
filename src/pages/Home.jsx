import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import AudiovisualCard from "../components/audioVisualCard/AudiovisualCard";
import AudioVisualFilter from "../components/audioVisualFilter/AudioVisualFilter";

const Home = (props) => {
  const { allAudioVisuals, getAudioVisuals } = useContext(AuthContext);

  useEffect(() => {
    getAudioVisuals();
  }, []);

  return (
    <div className="min-h-full pt-4 w-full flex flex-col items-center justify-center mb-6">
      <h1 className="text-2xl uppercase h2 mb-4">Welcome Home</h1>

      <AudioVisualFilter />

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4">
        {allAudioVisuals.length !== 0 &&
          allAudioVisuals.map((audiovisual) => (
            <AudiovisualCard audiovisual={audiovisual} key={audiovisual._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
