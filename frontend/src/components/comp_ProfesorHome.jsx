import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DefaultNavBar from "./comp_default_nav";

class ProfesorHome extends Component {

    render() {
        return (
            <div>
                <DefaultNavBar />

                <div id="PanelHome" className="home-panel">
                    <div className="container">
                        <h1>Bienvenido profesor, seleccióne la sección que desee revisar </h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfesorHome;