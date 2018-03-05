import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
    }

    async verifyUser(e) {        
        e.preventDefault();
        console.log("FRONTEND | VerifyUser Method Started");

        //console.log("App.js | VerifyUser: \n    Email: " + this.state.login + "\n    Password: " + this.state.password);
        //let me = this;

        var query = this.props.url + "api/verifyLogin";
        //alert(query);
        let response = await fetch(query, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: this.state.login,
                password: this.state.password
            })
        });

        if (response.status === 401) {
            alert("¡Usuario o contraseña incorrectos!");
        }else if (response.status === 200) {
            let token = await response.text();

            /*console.log("ELRPOPS:   ");
            console.log(this.props);*/
            
            var jsonRes = JSON.parse(token);

            this.props.saveToken(jsonRes);

            //console.log(jsonRes[0]);

            if(jsonRes[0].tipo == "Profesor"){
                this.props.history.push("profesor");
            }else if(jsonRes[0].tipo == "Estudiante"){
                this.props.history.push("estudiante");
            }else{
                alert("ERROR: Tipo de usuario desconodico.");
            }
        } else throw new Error("Error desconocido en Login");
    }

    handleInputChange(e) {
        //console.log(e.target.name + " - " + e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="Login">
                <div className="container vertical-center">
                    <div className="col-md-12">

                        <h1 className="Login-title">Welcome to "Shool name" Academic agenda!</h1>

                        <form onSubmit={this.verifyUser}>
                            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input name="login" value={this.state.login} onChange={this.handleInputChange} type="text" id="login" className="form-control" placeholder="Email address" required autoFocus />

                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input name="password" value={this.state.password} onChange={this.handleInputChange} type="password" id="password" className="form-control" placeholder="Password" required />

                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                            </div>

                            <button type="submit" className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2018</p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;