import React, { useContext, useEffect } from "react";
import Project from "./Project";
import ProjectContex from "../../context/projects/ProjectContex";
import AlertContext from "../../context/alert/AlertContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ListProjects = () => {
  const projectsContext = useContext(ProjectContex);
  const { projects, getProjects, msg } = projectsContext;
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  useEffect(() => {
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    getProjects();
    // eslint-disable-next-line
  }, [msg]);

  if (projects.length === 0)
    return <p>No hay proyectos comienza creando uno.</p>;
  return (
    <ul className="listado-proyectos">
      {alert && <div className={`alerta ${alert.category}`}>{alert.msg}</div>}
      <TransitionGroup>
        {projects.map(project => (
          <CSSTransition key={project._id} classNames="proyecto" timeout={200}>
            <Project project={project} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListProjects;
