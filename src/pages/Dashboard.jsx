import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

export default function Dashboard() {
  const { token, getUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getUser(token);
    }
  }, [token]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (!token) {
    return (
      <div>
        <h2>Dasboard page</h2>
        <h2>You must be login</h2>
      </div>
    );
  }
  return (
    <div>
      <h1>Welcome to user profile</h1>
      <h2>Bienvenue {user.pseudo}</h2>
    </div>
  );
}
