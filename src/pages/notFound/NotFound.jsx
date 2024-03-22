import React from "react";
import "./notFound.css";
import { Link } from "react-router-dom";
import NotFoundAnimation from "../../components/animation/NotFoundAnimation";

function NotFound() {
  return (
    <div className="background-container min-h-full pt-4 px-3 w-full flex flex-col items-center justify-center mb-6">
      <h1 className="h2 sm:text-2xl text-xl uppercase mb-4">
        Page Inexistante
      </h1>
      <div className="container mt-6 mx-auto max-w-[700px]">
        <NotFoundAnimation />
      </div>
      <Link to={"/"}>
        <button id="btn" className="mt-3">
          {" "}
          Retourner à la page d'accueil{" "}
        </button>
      </Link>
    </div>
  );
}

export default NotFound;