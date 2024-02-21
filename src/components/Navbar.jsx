import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  return (
    <nav className="flex flex-row justify-between px-4">
      <section className="MOBILE-MENU flex lg:hidden">
        <div
          className="HAMBURGER-ICON space-y-2"
          onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
        >
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
        </div>

        <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
          {" "}
          // toggle class based on isNavOpen state
          <div
            className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
          >
            <svg
              className="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
            <li className="border-b border-gray-400 my-8 uppercase">
              <a href="/about">About</a>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase">
              <a href="/portfolio">Portfolio</a>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase">
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
      </section>

      <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
        <li>
          <NavLink to="/" className="m-2">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className="m-2">
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="m-2">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/create-audiovisual" className="m-2">
            Créer un audiovisuel
          </NavLink>
        </li>
        <li>{isLoggedIn && <button onClick={logout}>Logout</button>}</li>
      </ul>
      {/* <NavLink to="/" className="m-2">Home</NavLink>
      <NavLink to="/signup" className="m-2">Signup</NavLink>
      <NavLink to="/login" className="m-2">Login</NavLink>
      <NavLink to="/create-audiovisual" className="m-2">Créer un audiovisuel</NavLink>
      {isLoggedIn && <button onClick={logout}>Logout</button>} */}
    </nav>
  );
};

export default Navbar;
