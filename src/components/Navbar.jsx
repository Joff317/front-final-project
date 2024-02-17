import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/create-audiovisual">Créer un audiovisuel</NavLink>
      {isLoggedIn && <button onClick={logout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
