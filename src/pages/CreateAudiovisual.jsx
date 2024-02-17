import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

const CreateAudiovisual = () => {
  const { token, createAudioVisuals, isLoggedIn } = useContext(AuthContext);
  const [categorie, setCategorie] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState();
  const [duration, setDuration] = useState();
  const [image, setImage] = useState();
  //   categorie, synopsis, title, genre, author, date, image
  const navigate = useNavigate();

  useEffect(() => {
   if (token) {
     getUser(token);
   }
 }, [token]);

  if (!isLoggedIn) {
    return (
      <div>
        <h3>You must be login to see articles</h3>
        <button onClick={() => navigate("/")}>Go to login page</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseCreateAudioVisual = await createAudioVisuals(
      e,
      token,
      categorie,
      synopsis,
      title,
      genre,
      author,
      date,
      duration,
      image
    );
    console.log(responseCreateAudioVisual);
  };
  return (
    <div>
      <h2>Créer un film, série ou animé</h2>

      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>Categorie :</label>
          <input
            type="text"
            value={categorie}
            onChange={(e) => {
              setCategorie(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Titre :</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Synopsis :</label>
          <input
            type="text"
            value={synopsis}
            onChange={(e) => {
              setSynopsis(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Genre :</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Auteur :</label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Date d'apparution :</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Durée :</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Image :</label>
          <input
            type="file"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <button type="submit">Créer un Audiovisuel</button>
      </form>
    </div>
  );
};

export default CreateAudiovisual;
