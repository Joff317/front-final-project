import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import SearchInput from "./SearchInput";
import { AudioVisualContext } from "../../context/audiovisual.context";

const SearchBar = ({ onSearch }) => {
  // const { searchAudioVisuals } = useContext(AuthContext);
  const [query, setQuery] = useState("");

  const { searchAudioVisuals } = useContext(AudioVisualContext);

  console.log(query);

  useEffect(() => {
    searchAudioVisuals(query);
    onSearch(query);
  }, [query]);

  const handleQuery = (e) => {
    const updatedQuery = e.target.value;
    setQuery(updatedQuery);
  };
  return (
    <div>
      <SearchInput handleQuery={handleQuery} query={query} />
    </div>
  );
};

export default SearchBar;
