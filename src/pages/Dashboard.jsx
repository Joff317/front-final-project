import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import AudioVisualList from "../components/audioVisualList/AudioVisualList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, isLoggedIn, checkLogin, getUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
    getUser();
  }, []);

  console.log(user);

  if (!isLoggedIn) {
    return (
      <div className="h-screen pt-4 w-full flex flex-col items-center justify-center">
        <h2 className="text-xl uppercase h2 mb-4 text-center p-2 ">
          Vous devez être connecté pour accéder à votre profil{" "}
        </h2>
        <button id="btn" onClick={() => navigate("/login")}>
          Go to login page
        </button>
      </div>
    );
  }

  // console.log(user);
  return (
    <section>
      <h1>Welcome to user profile</h1>
      <h2>Bienvenue {user.pseudo}</h2>
      <AudioVisualList user={user} />
    </section>
  );
}
