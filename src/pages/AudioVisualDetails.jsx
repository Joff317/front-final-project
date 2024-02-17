import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AudioVisualDetails = () => {
  let { id } = useParams();
  const [audiovisualDetails, setAudioVisualDetails] = useState(null);
  const BACK_API_URL = process.env.API_URL;
  const fetchAudioVisualDetails = () => {
    axios
      .get(`${BACK_API_URL}/api/audiovisual/${id}`)
      .then((res) => {
        console.log(res.data);
        setAudioVisualDetails(res.data.audioVisual);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchAudioVisualDetails();
  }, [id]);
  return (
    <div className="min-h-full pt-4 w-full flex flex-col justify-center items-center">
      <h1 className="text-black text-4xl mb-8 text-center font-pacifico">
        {audiovisualDetails && audiovisualDetails.title}
      </h1>
      <p>{audiovisualDetails && audiovisualDetails.synopsis}</p>
    </div>
  );
};

export default AudioVisualDetails;