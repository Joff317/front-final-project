import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context.jsx";
import "./index.css";
import { AudioVisualProviderWrapper } from "./context/audiovisual.context.jsx";
import { CommentariesProviderWrapper } from "./context/commentaries.context.jsx";
import { FavoritesProviderWrapper } from "./context/favorites.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProviderWrapper>
      <AudioVisualProviderWrapper>
        <CommentariesProviderWrapper>
          <FavoritesProviderWrapper>
            <App />
          </FavoritesProviderWrapper>
        </CommentariesProviderWrapper>
      </AudioVisualProviderWrapper>
    </AuthProviderWrapper>
  </BrowserRouter>
);
