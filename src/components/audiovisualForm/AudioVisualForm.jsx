import React, { useContext, useState } from "react";
import UploadWidget from "../widget/UploadWidget";
import { AuthContext } from "../../context/auth.context";
import "./audiovisualForm.css";
import { validateCategory } from "../utils/ValisationUtils";
import { useNavigate } from "react-router-dom";
import { AudioVisualContext } from "../../context/audiovisual.context";

const AudioVisualForm = () => {
  const { token } = useContext(AuthContext);
  const { createAudioVisuals } = useContext(AudioVisualContext);

  const [categorie, setCategorie] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState();
  const [image, setImage] = useState("");
  const [categorieError, setCategorieError] = useState("");
  const [audiovisualCreated, setAudiovisualCreated] = useState(false);
  const navigate = useNavigate();

  const allowedGenre = [
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("test création audiovisuel");
    if (!validateCategory(categorie)) {
      setCategorieError("Ça doit être 'film' ou 'série' ou 'animé'");
      return;
    }

    const responseCreateAudioVisual = await createAudioVisuals(
      token,
      categorie,
      synopsis,
      title,
      genre,
      author,
      date,
      image,
      duration
    );

    setAudiovisualCreated(true);

    setTimeout(() => {
      navigate("/");
    }, 5000);
  };

  return (
    <>
      <div className="sm:w-[500px] max-sm:w-[300px] flex flex-col mb-2">
        <label className="label-form">
          Image <span className="text-red-700">*</span> :
        </label>
        <div className="flex justify-center">
          <UploadWidget onImageChange={setImage} />
        </div>
      </div>
      <form
        className="sm:w-[500px] max-sm:w-[300px]"
        encType="multipart/form-data"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="flex flex-col gap-2 mb-3">
          <label className="label-form">
            Categorie <span className="text-red-700">*</span> :
          </label>
          <input
            placeholder="film, série ou animé"
            required
            className="input h-10"
            type="text"
            value={categorie}
            onChange={(e) => {
              setCategorie(e.target.value.toLowerCase());
            }}
          />
          {categorieError && <p className="text-red-700">{categorieError}</p>}
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="label-form">
            Titre <span className="text-red-700">*</span> :{" "}
          </label>
          <input
            placeholder="Star wars.."
            required
            className="input  h-10"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="label-form">
            Synopsis <span className="text-red-700">*</span> :
          </label>
          <input
            placeholder="description du film.."
            required
            className="input h-10"
            type="text"
            value={synopsis}
            onChange={(e) => {
              setSynopsis(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="label-form">
            Genre(s) <span className="text-red-700">*</span> :
          </label>
          <select
            className="input p-3"
            required
            multiple
            value={genre}
            onChange={(e) => {
              const selectedGenres = Array.from(e.target.options)
                .filter((option) => option.selected)
                .map((option) => option.value);

              setGenre(selectedGenres);
            }}
          >
            {allowedGenre.map((genreOption) => (
              <option key={genreOption} value={genreOption}>
                {genreOption}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="label-form">
            Auteur <span className="text-red-700">*</span> :
          </label>
          <input
            placeholder="auteur.."
            required
            className="input  h-10"
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="label-form">
            Date d'apparution <span className="text-red-700">*</span> :
          </label>
          <input
            required
            className="input  h-10"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2 mb-3">
          <label className="label-form">
            Durée <span className="text-red-700">*</span> :
          </label>
          <input
            placeholder="durée en minutes.."
            required
            className="input  h-10"
            type="number"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit" id="btn">
            Créer un Audiovisuel
          </button>
        </div>

        {audiovisualCreated && (
          <div className="w-40 flex mx-auto popup mt-6 rounded-md p-3">
            <p className="text-center mx-auto">Audiovisuel crée</p>
          </div>
        )}
      </form>
    </>
  );
};

export default AudioVisualForm;
