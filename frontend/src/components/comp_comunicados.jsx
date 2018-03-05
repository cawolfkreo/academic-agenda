import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Comunicados.css';

import DefaultNavBar from "./comp_default_nav";
import Comunicado from "./comp_comunicado.jsx";

class Comunicados extends Component {

    constructor(props) {
        super(props);

        this.state = {
            comunicados: [{autor: "El"}]
        };

        this.cargarComunicados = this.cargarComunicados.bind(this);
    }

    async cargarComunicados() {
        /*var jsonRes = JSON.parse(this.props.token);
        var userLogin = jsonRes[0].login;

        alert("Login: " + userLogin);*/

        var query = this.props.url + "api/comunicados";
        //alert(query);
        let response = await fetch(query, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tipo: "general"
            })
        });

        if (response.status === 401) {
            alert("¡Error");
        } else if (response.status === 200) {
            var comunicados = await response.text();

            var jsonRes = JSON.parse(comunicados);

            this.setState({
                comunicados: jsonRes
            });

            console.log(jsonRes);
        }
    }

    componentDidMount() {
        this.cargarComunicados();
    }

    render() {
        return (
            <div>
                <DefaultNavBar />

                <div id="Contenedor_Comunicados" className="container basic-container">
                    <div className="row">
                        <div className="col-lg-12">

                            <header className="PanelHeader">
                                <h1>Comunicados Generales</h1>
                                <hr className="my-4" />
                            </header>

                            <div className="ContenedorComunicados">
                                {this.state.comunicados.map(
                                    (f) => {
                                        return (<Comunicado autor={f.autor} destinatario={f.destinatario} fecha={f.fecha} texto={f.texto}/>);
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comunicados;