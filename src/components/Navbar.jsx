import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Signup</NavLink>
      <NavLink to="/login">Signup</NavLink>
    </nav>
  );
};

export default Navbar;
