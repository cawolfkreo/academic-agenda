import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Materia.css';

import ComunicadosMateria from "./comp_comunicadosMateria.jsx";
import TareasMateria from "./comp_tareasMateria.jsx";

class Materia extends Component {

    render() {
        return (
            <div id="Materia Container" className="container basic-container">
                <h1>{this.props.nombre}</h1>
                <hr className="my-4" />

                <div id="accordion">
                    <ComunicadosMateria comunicados={this.props.comunicados}/>
                    <TareasMateria tareas={this.props.tareas}/>
                </div>
            </div>
        );
    }
}

export default Materia;