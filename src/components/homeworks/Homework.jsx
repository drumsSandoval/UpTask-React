import React, { useContext } from "react";
import HomeworkContext from "../../context/homeworks/HomeworkContext";
import ProjectsContext from "../../context/projects/ProjectContex";
const Homework = ({ homework }) => {
  const homeworksContext = useContext(HomeworkContext);
  const {
    deleteHomework,
    getHomeworks,
    setCurrentHomework,
    updateHomework
  } = homeworksContext;
  const projectsContext = useContext(ProjectsContext);
  const { project } = projectsContext;
  const _deleteHomework = id => {
    deleteHomework(id, project[0]._id);
    getHomeworks(project[0]._id);
  };
  const changeState = homework => {
    if (homework.state) {
      homework.state = false;
    } else {
      homework.state = true;
    }
    updateHomework(homework);
  };
  const selectHomework = homework => {
    setCurrentHomework(homework);
  };
  return (
    <li className="tarea sombra">
      <p>{homework.name}</p>
      <div className="estado">
        {homework.state ? (
          <button
            type="button"
            className="completo"
            onClick={() => changeState(homework)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => changeState(homework)}
          >
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectHomework(homework)}
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => _deleteHomework(homework._id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Homework;
