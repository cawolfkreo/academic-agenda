import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Materia.css';

import Tarea from "./comp_tarea.jsx";

class TareasMateria extends Component {

    render() {
        return (
            <div class="card">
                <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Tareas
                        </button>
                    </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                        {this.props.tareas.map(
                            (f) => {
                                return (<Tarea titulo={f.Titulo} fecha={f.Fecha} texto={f.Texto}/>);
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

export default TareasMateria;