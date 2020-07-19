import React, { useReducer } from "react";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import { tokenAuth } from "../../config/tokenAuth";
import {
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  ERROR_REGISTER,
  CLOSE_SESION,
  GET_USER,
  SUCCESS_REGISTER
} from "../../types";
import clientAxios from "../../config/axios";
const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    auth: null,
    user: null,
    msg: null,
    loading: true
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const userRegister = async datos => {
    try {
      const response = await clientAxios.post("/api/users", datos);
      console.log(response);
      dispatch({
        type: SUCCESS_REGISTER,
        payload: response.data
      });
      userAuth();
    } catch (error) {
      console.log(error.response);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error"
      };
      dispatch({
        type: ERROR_REGISTER,
        payload: alert
      });
    }
  };
  const userAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const response = await clientAxios.get("/api/auth");
      console.log(response);
      dispatch({
        type: GET_USER,
        payload: response.data.user
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_LOGIN
      });
    }
  };

  const initSesion = async datos => {
    try {
      const response = await clientAxios.post("/api/auth", datos);
      console.log(response);
      dispatch({
        type: SUCCESS_LOGIN,
        payload: response.data
      });
      userAuth();
    } catch (error) {
      console.log(error);
      const alert = {
        msg: error.response.data.msg,
        category: "alerta-error"
      };
      dispatch({
        type: ERROR_LOGIN,
        payload: alert
      });
    }
  };
  const closeSession = () => {
    dispatch({
      type: CLOSE_SESION
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        auth: state.auth,
        user: state.user,
        msg: state.msg,
        loading: state.loading,
        userRegister,
        initSesion,
        userAuth,
        closeSession
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
