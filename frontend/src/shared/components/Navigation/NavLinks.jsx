import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { useContext } from "react";

import { AuthContext } from "../../context/auth-context";

function NavLinks() {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/locations">MY LOCATIONS</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/locations/new">ADD LOCATION</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button type="button" onClick={auth.logout}>
            LOGOUT
          </button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
