import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import "./audioVisualCard.css";
const AudiovisualCard = (props) => {
  const { audiovisual, favorites, deleteFavorite } = props;
  const isImage = audiovisual.image;
  const isFavorite =
    favorites && favorites.some((fav) => fav._id === audiovisual._id);

  // const handleDeleteFavorite = () => {
  //   deleteFavorite(audiovisual._id);
  // };

  return (
    <div key={audiovisual._id} className="relative col-span-1 mx-3 px-2">
      {isFavorite && (
        <div className="absolute z-[100000]">
          <Button
            className="text-tiny text-white font-bold mr-2 top-[-10px] right-[9px] z-[100000] "
            color="error"
            radius="full"
            size="sm"
            id="delete-btn"
            onClick={props.deleteFavorite}
          >
            X
          </Button>
        </div>
      )}
      <Card
        isFooterBlurred
        className="w-[270px] h-[300px] col-span-12 sm:col-span-5 rounded-t-xl rounded-b-xl visual-card shadow-md shadow-black"
      >
        <CardHeader className="absolute z-10 top-1 items-start ">
          <h4
            className=" font-bold text-lg py-1 px-2 mx-auto overflow-x-auto whitespace-nowrap card-header-title"
            id="title-header"
          >
            {audiovisual.title}
          </h4>
        </CardHeader>
        {isImage ? (
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-120 -translate-y-1 object-cover rounded-b-xl"
            src={audiovisual.image}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-black text-lg">No image available</p>
          </div>
        )}
        <CardFooter className="absolute bg-black/80 bottom-1 border-t-1 border-zinc-100/50 z-10 justify-between h-[30%] w-full rounded-b-xl">
          {/* absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between h-[30%] */}
          <div className="flex flex-col w-[50%]">
            <div className="h-[50%]">
              <p className="text-white text-tiny flex flex-col">
                <span className="card-lil-title-bis text-center font-bold uppercase">
                  {" "}
                  {audiovisual.categorie}{" "}
                </span>
              </p>
            </div>
            <div className="flex flex-col">
              <span className="card-lil-title font-bold">Genre :</span>
              <p className="text-white text-tiny overflow-x-auto  whitespace-nowrap pl-2">
                {audiovisual.genre.join(", ")}
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <Link to={`/details/${audiovisual._id}`}>
              <Button
                className="text-tiny  text-white font-bold"
                color="primary"
                radius="full"
                size="sm"
                id="card-btn"
              >
                Voir plus
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AudiovisualCard;
