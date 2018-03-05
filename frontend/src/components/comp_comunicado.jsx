import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Comunicado.css';

class Comunicado extends Component {    

    render() {
        return (
            <div>
                <div className="jumbotron my-jumbotron">
                    <div className="row">
                        <div className="col-sm">
                            <a className="negrilla">Autor: </a>
                            <a id="txtAutor">{this.props.autor}</a>
                        </div>

                        <div className="col-sm txt-center">
                            <a className="negrilla">Desinatario: </a>
                            <a id="txtTipo">{this.props.destinatario}</a>
                        </div>

                        <div className="col-sm txt-right">
                            <a className="negrilla">Fecha: </a>
                            <a id="txtFecha">{this.props.fecha}</a>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <p id="txtComunicado" className="lead">{this.props.texto}</p>
                </div>
            </div>
        );
    }
}

export default Comunicado;