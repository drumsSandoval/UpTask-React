import {
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  ERROR_REGISTER,
  CLOSE_SESION,
  GET_USER,
  SUCCESS_REGISTER
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
    case SUCCESS_REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        auth: true,
        msg: null,
        loading: false
      };
    case CLOSE_SESION:
    case ERROR_LOGIN:
    case ERROR_REGISTER:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        msg: action.payload,
        auth: null,
        user: null,
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        auth: true,
        loading: false
      };
    default:
      return state;
  }
};
