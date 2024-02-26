import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import AudiovisualCard from "../audioVisualCard/AudiovisualCard";

const AudioVisualFilter = ({ handleTypeChange }) => {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    handleTypeChange(selectedValue === "tout" ? "" : selectedValue);
  };

  return (
    <div className="mb-6">
      <label htmlFor="visualType">Choisir le type :</label>
      <select id="visualType" onChange={handleChange}>
        <option value="">Tout</option>
        <option value="film">Films</option>
        <option value="serie">Séries</option>
        <option value="animé">Animés</option>
      </select>
    </div>
  );
};

export default AudioVisualFilter;
