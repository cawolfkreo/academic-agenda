import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/MateriasEstudiante.css';

import DefaultNavBar from "./comp_default_nav";
import Materia from "./comp_materia.jsx";

class MateriasEstudiante extends Component {

    constructor(props) {
        super(props);

        this.state = {
            materias: [{
                codigo: "Materia11",
                nombre: "Materia",
                estudiante: "Estudiante1"
            }],

            materiaAct: {
                codigo: "Materia11",
                nombre: "Materia",
                estudiante: "Estudiante1"
            },
            comunicados: [],
            tareas: []
        };

        this.cargarMaterias = this.cargarMaterias.bind(this);
        this.cargarMateria = this.cargarMateria.bind(this);
        this.cargarComunicados = this.cargarComunicados.bind(this);
        this.cargarTareas = this.cargarTareas.bind(this);
        this.cargar = this.cargar.bind(this);
    }  

    componentDidMount() {
        
        this.cargar();
    }

    async cargar(){
        var json = this.props.token[0];
        var matsACargar = json.Materias;
        
        var materiasN = "{";

        matsACargar.forEach(element => {
            //console.log(element);

            var nMat = this.cargarMateria(element, true)
                .then((value) => {
                    materiasN += (value + ", ")
                }
            )     
        });

        materiasN += "}";

        console.log(JSON.parse(materiasN));

        this.setState({
            materias: materiasN,
            materiaAct: materiasN[0]
        })

        this.cargarComunicados();
        this.cargarTareas();
    }

    async cargarMaterias(e) {
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

    async cargarMateria(e, returnMat) {
        var query = this.props.url + "api/materia";
        //alert(query);
        var code = "";

        if(returnMat == true){
            code = e;
        }else{
            code = e.target.name;
        }

        let response = await fetch(query, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                codigo: code
            })
        });

        if (response.status === 401) {
            alert("¡Error");
        } else if (response.status === 200) {
            var materiaAPoner = await response.text();

            var jsonRes = await JSON.parse(materiaAPoner);

            if(returnMat){
                console.log("RETURN MATERIA " + jsonRes[0]);
                return jsonRes[0];
            }

            console.log("MATERIA NOT TRUE");

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

                <div id="Contenedor_Materias_Estudiante" className="container basic-container">
                    <div className="Materias">
                        <Materia codigo={this.state.materiaAct.codigo} nombre={this.state.materiaAct.nombre} comunicados={this.state.comunicados} tareas={this.state.tareas}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MateriasEstudiante;