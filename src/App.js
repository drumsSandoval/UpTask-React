import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProjectState from "./context/projects/ProjectState";
import HomeworkState from "./context/homeworks/HomeworkState";
import AuthState from "./context/auth/authState";
import AlertState from "./context/alert/AlertState";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Projects from "./components/projects/Projects";
import { tokenAuth } from "./config/tokenAuth";
import PrivateRoute from "./routes/PrivateRoute";
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}
function App() {
  return (
    <ProjectState>
      <HomeworkState>
        <AlertState>
          <AuthState>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/sign-up" component={SignUp} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </BrowserRouter>
          </AuthState>
        </AlertState>
      </HomeworkState>
    </ProjectState>
  );
}

export default App;
