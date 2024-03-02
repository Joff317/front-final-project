import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import "./audioVisualCard.css";
const AudiovisualCard = (props) => {
  const { audiovisual } = props;
  const isImage = audiovisual.image;
  return (
    <div key={audiovisual._id}>
      <Card
        isFooterBlurred
        className="w-[300px] h-[300px] col-span-12 sm:col-span-5"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-black font-bold text-lg p-1" id="title-header">
            {audiovisual.title}
          </h4>
        </CardHeader>
        {isImage ? (
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            src={audiovisual.image}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-black text-lg">No image available</p>
          </div>
        )}
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">
              Categorie : {audiovisual.categorie}
            </p>
            <p className="text-black text-tiny ">
              Genre : {audiovisual.genre.join(", ")}
            </p>
          </div>
          <Link to={`/${audiovisual._id}`}>
            <Button
              className="text-tiny  text-white font-bold"
              color="primary"
              radius="full"
              size="sm"
              id="btn"
            >
              See Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AudiovisualCard;
