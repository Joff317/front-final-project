import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

const Home = (props) => {
  const { allAudioVisuals, getAudioVisuals } = useContext(AuthContext);

  useEffect(() => {
    getAudioVisuals();
  }, []);

  return (
    <div>
      <h1>Welcome Home</h1>

      {allAudioVisuals.length !== 0 &&
        allAudioVisuals.map((audiovisual, index) => (
          <div key={index}>
            <h3>{audiovisual.title}</h3>
            <p>{audiovisual.synopsis}</p>
            <img src={audiovisual.image} alt="" />
            <button>see details</button>
          </div>
        ))}
    </div>
  );
};

export default Home;
