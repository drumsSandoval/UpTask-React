import React, { useReducer } from "react";
import HomeworkContext from "./HomeworkContext";
import HomeworkReducer from "./HomeworkReducer";
import {
  HOMEWORKS_PROJECT,
  ADD_HOMEWORK,
  VALIDATE_HOMEWORK,
  DELETE_HOMEWORK,
  CURRENT_HOMEWORK,
  UPDATE_HOMEWORK
} from "../../types";
import clientAxios from "../../config/axios";
const HomeworkState = props => {
  const initialState = {
    homeworksProject: [],
    errorHomework: false,
    currentHomework: null
  };
  const [state, dispatch] = useReducer(HomeworkReducer, initialState);
  const getHomeworks = async project => {
    try {
      const response = await clientAxios.get("/api/homeworks", {
        params: { project }
      });
      dispatch({
        type: HOMEWORKS_PROJECT,
        payload: response.data.homeworks
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const addHomework = async homework => {
    try {
      const response = await clientAxios.post("/api/homeworks", homework);
      console.log(response);
      dispatch({
        type: ADD_HOMEWORK,
        payload: homework
      });
    } catch (error) {
      console.log(error);
    }
  };
  const validateHomework = () => {
    dispatch({
      type: VALIDATE_HOMEWORK
    });
  };
  const deleteHomework = async (id, projectId) => {
    try {
      await clientAxios.delete(`/api/homeworks/${id}`, {
        params: { project: projectId }
      });
      dispatch({
        type: DELETE_HOMEWORK,
        payload: id
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setCurrentHomework = homework => {
    dispatch({
      type: CURRENT_HOMEWORK,
      payload: homework
    });
  };
  const updateHomework = async homework => {
    try {
      const response = await clientAxios.put(
        `/api/homeworks/${homework._id}`,
        homework
      );
      dispatch({
        type: UPDATE_HOMEWORK,
        payload: response.data.homework
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <HomeworkContext.Provider
      value={{
        homeworksProject: state.homeworksProject,
        errorHomework: state.errorHomework,
        currentHomework: state.currentHomework,
        getHomeworks,
        addHomework,
        validateHomework,
        deleteHomework,
        setCurrentHomework,
        updateHomework
      }}
    >
      {props.children}
    </HomeworkContext.Provider>
  );
};

export default HomeworkState;
