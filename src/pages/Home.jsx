import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import AudiovisualCard from "../components/audioVisualCard/AudiovisualCard";
import AudioVisualFilterByGenre from "../components/audioVisualFilter/AudioVisualFilterByGenre";
import AudioVisualFilter from "../components/audioVisualFilter/AudioVisualFilter";

const Home = (props) => {
  const { allAudioVisuals, getAudioVisuals, getFilteredAudioVisuals } =
    useContext(AuthContext);

  const [selectedType, setSelectedType] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    getAudioVisuals();
  }, []);

  const handleTypeChange = (selectedValue) => {
    setSelectedType(selectedValue);
    getFilteredAudioVisuals({
      categorie: selectedValue,
      genre: selectedGenre === "tout" ? "" : selectedGenre,
    });
  };

  const handleGenreChange = (selectedValue) => {
    setSelectedGenre(selectedValue);
    getFilteredAudioVisuals({
      categorie: selectedType,
      genre: selectedValue === "tout" ? "" : selectedValue,
    });
  };

  return (
    <div className="min-h-full pt-4 w-full flex flex-col items-center justify-center mb-6">
      <h1 className="text-2xl uppercase h2 mb-4">Welcome Home</h1>

      <AudioVisualFilter handleTypeChange={handleTypeChange} />

      <AudioVisualFilterByGenre handleGenreChange={handleGenreChange} />

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
