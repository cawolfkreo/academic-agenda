import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Comunicado.css';

class Tarea extends Component {    

    render() {
        return (
            <div>
                <div className="jumbotron my-jumbotron">
                    <div className="row">
                        <div className="col-sm">
                            <a className="negrilla"></a>
                            <a id="txtAutor"></a>
                        </div>

                        <div className="col-sm txt-center">
                            <a id="txtTipo">{this.props.titulo}</a>
                        </div>

                        <div className="col-sm txt-right">
                            <a className="negrilla">Fecha de entrega: </a>
                            <a id="txtFecha">{this.props.fecha}</a>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <p id="txtComunicado" className="lead">{this.props.texto}</p>
                </div>
            </div>
        )
    }
}

export default Tarea;