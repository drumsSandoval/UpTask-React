import React, { useContext, useEffect } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import FormHomework from "../homeworks/FormHomework";
import ListHomeWorks from "../homeworks/ListHomeworks";
import AuthContext from "../../context/auth/authContext";
const Projects = () => {
  const authContext = useContext(AuthContext);
  const { userAuth } = authContext;
  useEffect(() => {
    userAuth();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Header />
        <main>
          <FormHomework />
          <div className="contenedor-tareas">
            <ListHomeWorks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;
