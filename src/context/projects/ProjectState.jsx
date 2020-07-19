import React, { useReducer } from "react";
import ProjectContext from "./ProjectContex";
import ProjectReducer from "./ProjectReducer";
import clientAxios from "../../config/axios";
import {
  FORM_PROJECT,
  GET_PROJECTS,
  ADD_PROJECTS,
  VALIDATE_FORM,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT
} from "../../types/";
const ProjectState = props => {
  const initialState = {
    projects: [],
    form: false,
    errForm: false,
    project: null,
    msg: null
  };
  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(ProjectReducer, initialState);
  // Serie de funciones para el CRUD
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT
    });
  };
  const getProjects = async () => {
    try {
      const response = await clientAxios.get("/api/projects");
      dispatch({
        type: GET_PROJECTS,
        payload: response.data.projects
      });
    } catch (err) {
      console.log(err);
      const alert = {
        msg: "Hubo un error",
        category: "alerta-error"
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      });
    }
  };
  const addProject = async project => {
    try {
      const response = await clientAxios.post("/api/projects", project);
      console.log(response);
      dispatch({
        type: ADD_PROJECTS,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
      const alert = {
        msg: "Hubo un error",
        category: "alerta-error"
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      });
    }
  };
  const showError = () => {
    dispatch({
      type: VALIDATE_FORM
    });
  };
  const currentProject = projectId => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projectId
    });
  };
  const deleteProject = async projectId => {
    try {
      await clientAxios.delete(`/api/projects/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error",
        category: "alerta-error"
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert
      });
    }
  };
  return (
    <ProjectContext.Provider
      value={{
        projects: state.projects,
        form: state.form,
        project: state.project,
        errForm: state.errForm,
        msg: state.msg,
        getProjects,
        showForm,
        addProject,
        showError,
        currentProject,
        deleteProject
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
export default ProjectState;
