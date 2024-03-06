import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import logo from "../../assets/logo.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  console.log(user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: "Se connecter",
      navlink: "/login",
    },
    {
      name: "Créer un audiovisuel",
      navlink: "/create-audiovisual",
    },
    {
      name: "S'inscrire",
      navlink: "/signup",
    },
    {
      name: "Profile",
      navlink: "/dashboard",
    },
    {
      name: "Logout",
      isLogoutButton: true,
    },
  ];

  {
    /* <NavLink to="/" className="m-2">Home</NavLink>
      <NavLink to="/signup" className="m-2">Signup</NavLink>
      <NavLink to="/login" className="m-2">Login</NavLink>
      <NavLink to="/create-audiovisual" className="m-2">Créer un audiovisuel</NavLink>
      {isLoggedIn && <button onClick={logout}>Logout</button>} */
  }
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="navbar"  id="nav" maxWidth="full">
      <NavbarContent className="max-w-[600px]">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavLink to="/">
          <NavbarBrand>
            {/* <img src={logo} className="w-12 h-12 rounded-xl mr-2" /> */}
            <p className="navitem" id="home-item">
              <i className="fas fa-house fa-xl"></i>
            </p>
          </NavbarBrand>
        </NavLink>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" id="nav-ul">
        <NavbarItem>
          <NavLink
            to="/create-audiovisual"
            id="home-item"
            className={`navcolor navitem ${
              location.pathname === "/create-audiovisual" ? "active" : ""
            }`}
          >
            Créer un audiovisuel
          </NavLink>
        </NavbarItem>
        {isLoggedIn && (
          <NavbarItem>
            <NavLink
              to="/dashboard"
              id="home-item"
              className={`navcolor navitem ${
                location.pathname === "/dashboard" ? "active" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUser} size="xl" />
            </NavLink>
          </NavbarItem>
        )}
        {!isLoggedIn && (
          <NavbarItem>
            <NavLink
              to="/login"
              id="home-item"
              aria-current="page"
              className={`navcolor navitem ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              Se connecter
            </NavLink>
          </NavbarItem>
        )}
        {!isLoggedIn && (
          <NavbarItem>
            <NavLink
              id="home-item"
              to="/signup"
              className={`navcolor navitem ${
                location.pathname === "/signup" ? "active" : ""
              }`}
            >
              S'inscrire
            </NavLink>
          </NavbarItem>
        )}
        {isLoggedIn && (
          <NavbarItem>
            <button
              onClick={logout}
              id="home-item"
              className="navcolor navitem"
            >
              <i className="fa fa-arrow-right-from-bracket fa-xl"></i>
            </button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => {
          if (item.isLogoutButton) {
            // Conditionally render Logout button based on isLoggedIn
            return (
              isLoggedIn && (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <button onClick={logout} className="w-full text-left">
                    {item.name}
                  </button>
                </NavbarMenuItem>
              )
            );
          } else {
            // Conditionally render NavLink based on isLoggedIn
            return (
              (!isLoggedIn || item.navlink === "/create-audiovisual") && (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <NavLink className="w-full" to={item.navlink} size="lg">
                    {item.name}
                  </NavLink>
                </NavbarMenuItem>
              )
            );
          }
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
