import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../styles/Profesor.css';
import DefaultNavBar from "./comp_default_nav"

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from "./comp_ProfesorHome.jsx";
import Comunicados from "./comp_comunicados.jsx";

class Profesor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activePanel: "Home"
        };

        this.panelsHandler = this.panelsHandler.bind(this);
    }
       

    panelsHandler(newActive) {
        this.setState({
            activePanel: newActive
        });
    }

    render() {
        return (
            <div className="Profesor">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/comunicados" render={(props) => <Comunicados saveToken={this.props.saveToken} url={this.props.url} {...props} />} />
                </Switch>
            </div>
        );
    }
}

export default Profesor;