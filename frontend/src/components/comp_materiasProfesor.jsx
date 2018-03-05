import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/MateriasProfe.css';

import DefaultNavBar from "./comp_default_nav";
import Materia from "./comp_materia.jsx";

class MateriasProfe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            materias: [{
                codigo: "Materia11",
                nombre: "Materia",
                profesor: "Profesor1"
            }],

            materiaAct: {
                codigo: "Materia11",
                nombre: "Materia",
                profesor: "Profesor1"
            },
            comunicados: [],
            tareas: []
        };

        this.cargarMaterias = this.cargarMaterias.bind(this);
        this.cargarMateria = this.cargarMateria.bind(this);
        this.cargarComunicados = this.cargarComunicados.bind(this);
        this.cargarTareas = this.cargarTareas.bind(this);
    }  

    componentDidMount() {
        var json = this.props.token;
        //*var nombreDelProfe = json[0].Nombres;
        var loginP = json[0].login;

        /*console.log("PROPS DE MATERIAS");
        console.log(this.props);
        console.log("PROPS EN MATERIAS PROFESOR: " + json[0]);

        alert("¡Bienvenido profesor " + nombreDelProfe + "(" + json[0].login +  ")!");*/
        this.cargarMaterias(loginP);
    }

    async cargarMaterias(e) {
        console.log("FRONT | MateriasProfesor | Cargando materias de: " + e);
        var query = this.props.url + "api/materias";
        //alert(query);
        let response = await fetch(query, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                loginProfe: e
            })
        });

        if (response.status === 401) {
            alert("¡Error");
        } else if (response.status === 200) {
            var comunicados = await response.text();

            var jsonRes = JSON.parse(comunicados);

            this.setState({
                materias: jsonRes,
                materiaAct: jsonRes[0]
            });

            this.cargarComunicados();
            this.cargarTareas();
        }
    }

    async cargarMateria(e) {
        var query = this.props.url + "api/materia";
        //alert(query);
        let response = await fetch(query, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                codigo: e.target.name
            })
        });

        if (response.status === 401) {
            alert("¡Error");
        } else if (response.status === 200) {
            var materiaAPoner = await response.text();

            var jsonRes = JSON.parse(materiaAPoner);

            this.setState({
                materiaAct: jsonRes[0]
            });

            this.cargarComunicados();
            this.cargarTareas();
        }
    }

    async cargarComunicados() {
        var query = "api/comunicados";
        
        let response = await fetch(query, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tipo: "materia",
                codigoMateria: this.state.materiaAct.codigo
            })
        });

        if (response.status === 401) {
            alert("¡Error");
        } else if (response.status === 200) {
            var comunicados = await response.text();

            if(comunicados == "NOT_FOUND"){
                console.log("NOT_FOUND");
            }else{
               var jsonRes = JSON.parse(comunicados);

                this.setState({
                    comunicados: jsonRes
                });
            }            
        }
    }

    async cargarTareas() {
        var query = "api/tareas";
        
        let response = await fetch(query, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tipo: "materia",
                codigoMateria: this.state.materiaAct.codigo
            })
        });

        if (response.status === 401) {
            alert("¡Error");
        } else if (response.status === 200) {
            var comunicados = await response.text();

            if(comunicados == "NOT_FOUND"){
                console.log("NOT_FOUND");
            }else{
               var jsonRes = JSON.parse(comunicados);

                this.setState({
                    tareas: jsonRes
                });
            }            
        }
    }

    render() {
        return (
            <div>
                <DefaultNavBar />
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary items-nav">
                    <a className="navbar-brand" href="#">
                        <img src="" width="30" height="30" className="d-inline-block align-top" alt="" />
                        Mis materias
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navContent">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            {this.state.materias.map(
                                (f) => {
                                    return (<li className="nav-item active">
                                        <a name={f.codigo} className="nav-link" onClick={this.cargarMateria}>{f.nombre}</a>
                                    </li>);
                                })}
                        </ul>
                    </div>
                </nav>

                <div id="Contenedor_Materias_Profesor" className="container basic-container">
                    <div className="Materias">
                        <Materia codigo={this.state.materiaAct.codigo} nombre={this.state.materiaAct.nombre} comunicados={this.state.comunicados} tareas={this.state.tareas}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MateriasProfe;