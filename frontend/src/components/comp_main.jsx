/* global  */
import React, {Component} from "react";
import {Switch, Route} from "react-router-dom";

import Home from "./comp_home.jsx";
import Login from "./comp_login.jsx";
import Comunicados from "./comp_comunicados.jsx";

import Profesor from "./comp_profesor.jsx";
import ProfesorHome from "./comp_ProfesorHome.jsx";
import MateriasProfe from "./comp_materiasProfesor.jsx";

import Estudiante from "./comp_estudiante.jsx";
import EstudianteHome from "./comp_EstudianteHome.jsx";
import MateriasEstudiante from "./comp_materiasEstudiante.jsx";

class Main extends Component {

    render () {
        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" render={(props) => <Login token={this.props.token} saveToken={this.props.saveToken} url={this.props.url} {...props} />} />

                    <Route exact path="/profesor" render={(props) => <ProfesorHome token={this.props.token} saveToken={this.props.saveToken} url={this.props.url} {...props} />} />
                    <Route path="/profesor/comunicados" render={(props) => <Comunicados token={this.props.token} saveToken={this.props.saveToken} url={this.props.url} {...props} />} />
                    <Route path="/profesor/Materias" render={(props) => <MateriasProfe token={this.props.token} saveToken={this.props.saveToken} url={this.props.url} {...props} />} />

                    <Route exact path="/estudiante" render={(props) => <EstudianteHome token={this.props.token} saveToken={this.props.saveToken} url={this.props.url} {...props} />} />
                    <Route path="/estudiante/comunicados" render={(props) => <Comunicados token={this.props.token} saveToken={this.props.saveToken} url={this.props.url} {...props} />} />
                    <Route path="/estudiante/Materias" render={(props) => <MateriasEstudiante token={this.props.token} saveToken={this.props.saveToken} url={this.props.url} {...props} />} />
                </Switch>
            </main>
        );
    }
}

export default Main;