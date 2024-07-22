import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import { Person, Search, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import "../styles/NavBar.scss";
import { Link } from "react-router-dom";
import { setLogOut } from "../redux/state";

const NavBar = () => {
  const [dropdownMenu, setDropDownMenu] = useState(false);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch()

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input type="text" placeholder="Buscar..." />
        <IconButton>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Conviértete en anfitrión
          </a>
        ) : (
          <a href="/login" className="host">
            Conviértete en anfitrión
          </a>
        )}

        <button className="navbar_right_account" onClick={() => setDropDownMenu(!dropdownMenu)}>
          <Menu sx={{ color: variables.darkgrey }} />
          {!user ? (
            <Person sx={{ color: variables.darkgrey }} />
          ) : (
            <img
              src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/register">Registrarse</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link to="">Lista de viajes</Link>
            <Link to="">Lista de deseos</Link>
            <Link to="">Lista de propiedades</Link>
            <Link to="">Lista de reservas</Link>
            <Link to="">Hazte anfitrión</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogOut());
              }}
            >
              Cerrar Sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
