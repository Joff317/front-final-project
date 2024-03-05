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
    <div className="mb-8">
      <label
        htmlFor="visualType"
        className="block text-gray-500 text-md font-bold mb-2"
      >
        Choisir le genre :
      </label>
      <select
        id="visualType"
        className="filter bg-black border border-white text-gray-200 py-2 px-2 rounded focus:outline-none transition duration-300"
        onChange={handleChange}
      >
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
