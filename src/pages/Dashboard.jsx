import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Favorites from "../components/favorites/Favorites";

export default function Dashboard() {
  const { user, isLoggedIn, checkLogin, getUser, favorites } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
    // getUser();
  }, []);

  useEffect(() => {
    getUser();
    console.log(user);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="h-screen pt-4 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl uppercase h2 mb-4 text-center p-2 ">
          Vous devez être connecté pour accéder à votre profil{" "}
        </h2>
        <button id="btn" onClick={() => navigate("/login")}>
          Aller à la page de connexion
        </button>
      </div>
    );
  }

  // console.log(user);
  return (
    <div className="min-h-full pt-4 w-full flex flex-col items-center justify-center mb-6">
      <h2 className="sm:text-2xl text-xl uppercase h2 mb-4 font-dancing-script">
        Bienvenue {user && user.pseudo}
      </h2>
      {!user.favorites || user.favorites.length <= 0 ? (
        "Vous n'avez pas encore de favoris"
      ) : (
        <Favorites user={user} />
      )}
    </div>
  );
}
