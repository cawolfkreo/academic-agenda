import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DefaultNavBarEstudiante from "./comp_default_nav_estudiante";

class EstudianteHome extends Component {

    render() {
        return (
            <div>
                <DefaultNavBarEstudiante />

                <div id="PanelHome" className="home-panel">
                    <div className="container">
                        <h1>Bienvenido estudiante, seleccióne la sección que desee revisar </h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default EstudianteHome;