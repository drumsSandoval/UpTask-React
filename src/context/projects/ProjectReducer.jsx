import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECTS,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT
} from "../../types/";

export default (state, action) => {
  switch (action.type) {
    case FORM_PROJECT: {
      return {
        ...state,
        form: true
      };
    }
    case GET_PROJECTS: {
      return {
        ...state,
        projects: action.payload
      };
    }
    case ADD_PROJECTS: {
      return {
        ...state,
        projects: [action.payload, ...state.projects],
        form: false,
        errForm: false
      };
    }
    case VALIDATE_FORM: {
      return {
        ...state,
        errForm: true
      };
    }
    case CURRENT_PROJECT: {
      return {
        ...state,
        project: state.projects.filter(
          project => project._id === action.payload
        )
      };
    }
    case DELETE_PROJECT: {
      return {
        ...state,
        projects: state.projects.filter(
          project => project._id !== action.payload
        ),
        project: null
      };
    }
    case ERROR_PROJECT: {
      return {
        ...state,
        msg: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
