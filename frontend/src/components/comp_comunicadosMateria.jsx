import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Materia.css';

import Comunicado from "./comp_comunicado.jsx";

class ComunicadosMateria extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comunicados: [{autor: "El"}]
        };
    }    

    componentDidMount() {
    }

    render() {
        return (
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Comunicados
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        {this.props.comunicados.map(
                            (f) => {
                                return (<Comunicado autor={f.autor} destinatario={f.destinatario} fecha={f.fecha} texto={f.texto} />);
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

export default ComunicadosMateria;