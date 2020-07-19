import React, { useContext, useState, useEffect } from "react";
import ProjectsContext from "../../context/projects/ProjectContex";
import HomeworkContext from "../../context/homeworks/HomeworkContext";
const FormHomework = () => {
  const homeworksContext = useContext(HomeworkContext);
  const {
    currentHomework,
    errorHomework,
    addHomework,
    validateHomework,
    getHomeworks,
    updateHomework
  } = homeworksContext;
  useEffect(() => {
    if (currentHomework !== null) {
      setHomework(currentHomework);
    } else {
      setHomework({
        name: ""
      });
    }
  }, [currentHomework]);

  const projectsContext = useContext(ProjectsContext);
  const { project } = projectsContext;
  const [homework, setHomework] = useState({
    name: ""
  });
  const { name } = homework;
  if (!project) {
    return null;
  }
  const [currentProject] = project;
  const handleChange = e => {
    setHomework({
      ...homework,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    if (name.trim() === "") {
      validateHomework();
      return;
    }
    if (currentHomework) {
      updateHomework(homework);
    } else {
      homework.project = currentProject._id;
      addHomework(homework);
    }
    getHomeworks(currentProject._id);
    setHomework({
      name: ""
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={currentHomework ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorHomework && (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      )}
    </div>
  );
};

export default FormHomework;
