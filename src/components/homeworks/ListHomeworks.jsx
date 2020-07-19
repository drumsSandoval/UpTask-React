import React, { Fragment, useContext } from "react";
import Homework from "./Homework";
import ProjectsContext from "../../context/projects/ProjectContex";
import HomeworkContext from "../../context/homeworks/HomeworkContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ListHomework = () => {
  const projectsContext = useContext(ProjectsContext);
  const homeworksContext = useContext(HomeworkContext);
  const { project, deleteProject } = projectsContext;
  const { homeworksProject } = homeworksContext;
  if (!project) {
    return <h2>Selecciona un Proyecto</h2>;
  }
  const [currentProject] = project;

  const _erase = () => {
    deleteProject(currentProject._id);
  };
  return (
    <Fragment>
      <h2>Proyecto: {currentProject.name}</h2>
      <ul className="listado-tareas">
        {homeworksProject.length === 0 ? (
          <li className="tarea">No hay tareas</li>
        ) : (
          <TransitionGroup>
            {homeworksProject.map(homework => (
              <CSSTransition key={homework.id} timeout={200} classNames="tarea">
                <Homework homework={homework} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button type="button" className="btn btn-eliminar" onClick={_erase}>
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListHomework;
