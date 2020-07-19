import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Header = () => {
  const authContext = useContext(AuthContext);
  const { userAuth, user, closeSession } = authContext;
  useEffect(() => {
    userAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <header className="app-header">
      {user && (
        <p className="nombre-usuario">
          Hola <span>{user.name}</span>{" "}
        </p>
      )}
      <nav className="nav-principal">
        <button className="btn btn-blank" onClick={() => closeSession()}>
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Header;
