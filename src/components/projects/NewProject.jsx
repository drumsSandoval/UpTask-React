import React, { Fragment, useState, useContext } from 'react'
import ProjectsContext from '../../context/projects/ProjectContex';
const NewProject = () => {
  const projectsContext = useContext(ProjectsContext);
  const { form, errForm ,showForm, addProject, showError } =projectsContext;
  const [project, setProject] = useState({
    name:''
  });
  const { name } = project;
  const onChangeProject = e => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  }
  const onSubmitProject = (e) => {
    e.preventDefault();
    if(name === ''){
      showError();
      return;
    } 
    addProject(project);
    setProject({
      name:''
    })
    
  }
  return ( 
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >Nuevo Proyecto
      </button>
      {
        form && (      
          <form 
            className="formulario-nuevo-proyecto"
            onSubmit={onSubmitProject}
          >
            <input 
              type="text" 
              className="input-text"
              placeholder="Nombre Proyecto"
              name="name"
              onChange={onChangeProject}
              value={name}
            />
            <input 
              type="submit" 
              value="Agregar Proyecto"
              className="btn btn-primario btn-block"
            />
          </form>)
      }
       {errForm && <p className="mensaje error">El Nombre del Proyecto es obligatorio</p>}
    </Fragment>
  );
}
 
export default NewProject;