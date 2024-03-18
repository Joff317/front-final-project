import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import AudiovisualCard from "../components/audioVisualCard/AudiovisualCard";
import AudioVisualFilterByGenre from "../components/audioVisualFilter/AudioVisualFilterByGenre";
import AudioVisualFilter from "../components/audioVisualFilter/AudioVisualFilter";
import SearchBar from "../components/homeSearchBar/SearchBar";
import AnimatedTitle from "../components/animation/AnimatedTitle";
import { AudioVisualContext } from "../context/audiovisual.context";

const Home = (props) => {
  // const { getFilteredAudioVisuals } =
  //   useContext(AuthContext);

  const { allAudioVisuals, getAudioVisuals, getFilteredAudioVisuals } = useContext(AudioVisualContext);

  const [selectedType, setSelectedType] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

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

  const handleSearch = (query) => {
    setIsSearchActive(!query);
  };

  return (
    <div className="min-h-full pt-4 w-full flex flex-col items-center justify-center mb-6">
      <AnimatedTitle />

      <SearchBar onSearch={handleSearch} />

      {isSearchActive && (
        <>
          <AudioVisualFilter handleTypeChange={handleTypeChange} />

          <AudioVisualFilterByGenre handleGenreChange={handleGenreChange} />
        </>
      )}

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {allAudioVisuals.length !== 0 &&
          allAudioVisuals.map((audiovisual) => (
            <AudiovisualCard audiovisual={audiovisual} key={audiovisual._id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
