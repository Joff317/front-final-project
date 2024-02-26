import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

const AudioVisualFilterByGenre = ({ handleGenreChange }) => {
  const genres = [
    "tout",
    "science-fiction",
    "horreur",
    "action",
    "aventure",
    "surnaturel",
    "drame",
    "comedie",
    "romance",
    "thriller",
    "fantastique",
    "animation",
    "documentaire",
    "policier",
    "autre",
  ];

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    handleGenreChange(selectedValue === "Tout" ? "" : selectedValue);
  };

  return (
    <div className="mb-6">
      <label htmlFor="visualType">Choisir le genre :</label>
      <select id="visualType" onChange={handleChange}>
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre.charAt(0).toUpperCase() + genre.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AudioVisualFilterByGenre;
