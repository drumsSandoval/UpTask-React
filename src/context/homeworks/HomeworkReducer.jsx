import {
  HOMEWORKS_PROJECT,
  ADD_HOMEWORK,
  VALIDATE_HOMEWORK,
  DELETE_HOMEWORK,
  CURRENT_HOMEWORK,
  UPDATE_HOMEWORK
} from "../../types";
export default (state, action) => {
  switch (action.type) {
    case HOMEWORKS_PROJECT:
      return {
        ...state,
        homeworksProject: action.payload,
        currentHomework: null
      };
    case ADD_HOMEWORK:
      return {
        ...state,
        homeworksProject: [action.payload, ...state.homeworksProject],
        errorHomework: false
      };
    case VALIDATE_HOMEWORK:
      return {
        ...state,
        errorHomework: true
      };
    case DELETE_HOMEWORK:
      return {
        ...state,
        homeworksProject: state.homeworksProject.filter(
          homework => homework._id !== action.payload
        )
      };
    case UPDATE_HOMEWORK:
      return {
        ...state,
        homeworksProject: state.homeworksProject.map(homework =>
          homework._id === action.payload._id ? action.payload : homework
        )
      };
    case CURRENT_HOMEWORK:
      return {
        ...state,
        currentHomework: action.payload
      };
    default:
      return state;
  }
};
