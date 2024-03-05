import React from "react";

const AudioVisualFilter = ({ handleTypeChange }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    handleTypeChange(selectedValue === "tout" ? "" : selectedValue);
  };

  return (
    <div className="mb-6 relative">
      <label
        htmlFor="visualType"
        className="block text-gray-500 text-md font-bold mb-2"
      >
        Choisir le type :
      </label>
      <select
        id="visualType"
        onChange={handleChange}
        className="filter border border-white text-gray-200 py-2 px-4 rounded focus:outline-none transition duration-300"
      >
        <option value="">Tout</option>
        <option value="film">Films</option>
        <option value="serie">Séries</option>
        <option value="anime">Animés</option>
      </select>
    </div>
  );
};

export default AudioVisualFilter;
