import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/authContext";
const Login = props => {
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { msg, auth, initSesion } = authContext;
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const { email, password } = user;
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  useEffect(() => {
    if (auth) {
      props.history.push("/projects");
    }
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    // eslint-disable-next-line
  }, [msg, auth, props.history]);
  const onSubmit = e => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error");
    }
    initSesion({ email, password });
  };
  return (
    <div className="form-usuario">
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <div className="contenedor-form sombra-dark">
        <h1>Inicia Sesion</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              onChange={onChange}
              value={email}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              onChange={onChange}
              value={password}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Login"
            />
          </div>
        </form>
        <Link to={"/sign-up"} className="enlace-cuenta">
          Registrate
        </Link>
      </div>
    </div>
  );
};

export default Login;
