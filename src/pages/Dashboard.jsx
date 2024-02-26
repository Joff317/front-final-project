import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import AudioVisualList from "../components/audioVisualList/AudioVisualList";

export default function Dashboard() {
  const { user, isLoggedIn, checkLogin, getUser } = useContext(AuthContext);

  useEffect(() => {
    checkLogin();
    getUser();
  }, []);

  console.log(user);

  if (!isLoggedIn) {
    return (
      <div>
        <h2>Dasboard page</h2>
        <h2>You must be login</h2>
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
