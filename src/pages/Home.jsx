import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import AudiovisualCard from "../components/audioVisualCard/AudiovisualCard";

const Home = (props) => {
  const { allAudioVisuals, getAudioVisuals } = useContext(AuthContext);

  useEffect(() => {
    getAudioVisuals();
  }, []);

  return (
    <div>
      <h1>Welcome Home</h1>

      {allAudioVisuals.length !== 0 &&
        allAudioVisuals.map((audiovisual) => (
          <AudiovisualCard audiovisual={audiovisual} key={audiovisual._id} />
        ))}
    </div>
  );
};

export default Home;
