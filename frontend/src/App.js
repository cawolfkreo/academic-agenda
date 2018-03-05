import React, { Component } from "react";
import Main from "./components/comp_main.jsx";

import "./styles/App.css";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {          
            token: null,
            activeUser: "none"
        };

        this.url = "";
    }

    saveToken(newToken) {
        this.setState({ token: newToken });
    }

    deleteToken() {
        this.setState({
            token: null
        });
    }

    render() {
        return (
            <div>
                <div className="main">
                    <Main token={this.state.token} saveToken={this.saveToken.bind(this)} deleteToken={this.deleteToken.bind(this)} url={this.url} />
                </div>
            </div>
        );
    }
}

export default App;