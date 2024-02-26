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
const Nav = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
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
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-purple-500"
      maxWidth="full"
    >
      <NavbarContent className="max-w-[600px]">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavLink to="/">
          <NavbarBrand>
            <img src={logo} className="w-12 h-12 rounded-xl mr-2" />
            <p className="text-black">Social Watch</p>
          </NavbarBrand>
        </NavLink>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" id="nav-ul">
        <NavbarItem>
          <NavLink
            to="/create-audiovisual"
            id="home-item"
            className={`navitem text-black ${
              location.pathname === "/create-audiovisual" ? "active" : ""
            }`}
          >
            Créer un audiovisuel
          </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink
            to="/dashboard"
            id="home-item"
            className={`navitem text-black ${
              location.pathname === "/dashboard" ? "active" : ""
            }`}
          >
            Profile
          </NavLink>
        </NavbarItem>
        {!isLoggedIn && (
          <NavbarItem>
            <NavLink
              to="/login"
              aria-current="page"
              className={`navitem text-black ${
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
              to="/signup"
              className={`navitem text-black ${
                location.pathname === "/signup" ? "active" : ""
              }`}
            >
              S'inscrire
            </NavLink>
          </NavbarItem>
        )}
        {isLoggedIn && (
          <NavbarItem>
            <button onClick={logout} className="navitem text-black">
              Logout
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