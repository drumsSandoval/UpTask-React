import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/authContext";
const SignUp = props => {
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { userRegister, msg, auth } = authContext;
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const { email, password, name, confirmPassword } = user;

  useEffect(() => {
    if (auth) {
      props.history.push("/projects");
    }
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    // eslint-disable-next-line
  }, [msg, auth, props.history]);
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      showAlert("Todos los campos son obligarotios", "alerta-error");
      return;
    }
    if (password.length < 6) {
      showAlert(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }
    if (password !== confirmPassword) {
      showAlert("No coinciden los passwords", "alerta-error");
      return;
    }
    userRegister({
      name,
      email,
      password
    });
  };
  return (
    <div className="form-usuario">
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una Cuenta</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="Name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu Nombre"
              onChange={onChange}
              value={name}
            />
          </div>
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
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirmar Password"
              onChange={onChange}
              value={confirmPassword}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
