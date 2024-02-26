import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";

const AudioVisualFilter = () => {
  const { getAudioVisualsByType, getFilterParams, setGetFilterParams } =
    useContext(AuthContext);

  useEffect(() => {
    getAudioVisualsByType();
  }, [getFilterParams]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;

    setGetFilterParams(selectedValue);
  };
  return (
    <div className="mb-6">
      <label htmlFor="visualType">Choisir le type :</label>
      <select
        id="visualType"
        value={getFilterParams || ""}
        onChange={handleChange}
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
