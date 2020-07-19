import React, { useContext } from "react";
import ProjectsContext from "../../context/projects/ProjectContex";
import HomeworkContext from "../../context/homeworks/HomeworkContext";
const Project = ({ project }) => {
  const projectsContext = useContext(ProjectsContext);
  const homeworksContext = useContext(HomeworkContext);
  const { currentProject } = projectsContext;
  const { getHomeworks } = homeworksContext;
  const selectProject = id => {
    currentProject(id);
    getHomeworks(id);
  };
  return (
    <li>
      <button
        type="button"
        className="btn "
        onClick={() => selectProject(project._id)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;
