import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";
import SearchInput from "./SearchInput";

const SearchBar = ({ onSearch }) => {
  const { searchAudioVisuals, getAudioVisuals } = useContext(AuthContext);
  const [query, setQuery] = useState("");

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
