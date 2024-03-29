import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AudioVisualContext = createContext();

function AudioVisualProviderWrapper(props) {
  const [audioVisuals, setAudioVisuals] = useState([]);
  const [allAudioVisuals, setAllAudioVisuals] = useState([]);
  const [audiovisualDetails, setAudioVisualDetails] = useState(null);
  const BACK_API_URL = process.env.API_URL;

  const createAudioVisuals = (
    userToken,
    categorie,
    synopsis,
    title,
    genre,
    author,
    date,
    image,
    duration
  ) => {
    axios
      .post(
        `${BACK_API_URL}/api/audiovisual/`,
        { categorie, synopsis, title, genre, author, date, image, duration },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setAudioVisuals(res.data.audioVisuals);
        return "Audiovisual created";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAudioVisuals = () => {
    axios
      .get(`${BACK_API_URL}/api/audiovisual/`)
      .then((res) => {
        console.log(res.data);
        setAllAudioVisuals(res.data.audioVisuals);
      })
      .catch((error) => {
        console.log("Get audiovisual Failed : ", error.message);
      });
  };

  const fetchAudioVisualDetails = (id) => {
    axios
      .get(`${BACK_API_URL}/api/audiovisual/${id}`)
      .then((res) => {
        console.log(res.data);
        setAudioVisualDetails(res.data.audioVisual);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchAudioVisuals = (query) => {
    console.log("Search Data", query);
    if (query !== "") {
      axios
        .get(`${BACK_API_URL}/api/audiovisual/searchbar/search?query=${query}`)
        .then((res) => {
          console.log("Search Results:", res.data.audioVisuals);
          setAllAudioVisuals(res.data.audioVisuals);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAudioVisuals();
    }
  };

  const getFilteredAudioVisuals = (query) => {
    return axios
      .get(`${BACK_API_URL}/api/audiovisual/filtered/mixed`, {
        params: query,
      })
      .then((response) => {
        console.log(
          "Filtered AudioVisuals Response:",
          response.data.audioVisuals
        );
        setAllAudioVisuals(response.data.audioVisuals);
        return response.data.audioVisuals;
      })
      .catch((error) => {
        console.error("Error fetching filtered audiovisuals: ", error);
      });
  };

  return (
    <AudioVisualContext.Provider
      value={{
        value: "AudioVisualValue",
        createAudioVisuals,
        audioVisuals,
        allAudioVisuals,
        setAllAudioVisuals,
        getAudioVisuals,
        fetchAudioVisualDetails,
        audiovisualDetails,
        searchAudioVisuals,
        getFilteredAudioVisuals

      }}
    >
      {props.children}
    </AudioVisualContext.Provider>
  );
}

export { AudioVisualContext, AudioVisualProviderWrapper };
