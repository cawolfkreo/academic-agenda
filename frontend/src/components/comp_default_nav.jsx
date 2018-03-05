import React, { Component } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class DefaultNavBar extends Component {

    constructor(props){
        super(props);

        this.state= {
            active: ""
        };

        this.handleActiveChange = this.handleActiveChange.bind(this);
    }

    handleActiveChange(e) {
        this.setState({ active: [e.target.name] });

        console.log(this.state.active);

        this.props.history.push(this.state.active);
    }

    render(){
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">
                        <img src="" width="30" height="30" className="d-inline-block align-top" alt=""/>
                        Academic Agenda
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navContent">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <a name="" className="nav-link" href="#profesor">Home <span className="sr-only">(current)</span></a>
                            </li>

                            <li className="nav-item">
                                <a name="comunicados" className="nav-link" href="#profesor/comunicados">Comunicados generales </a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="#profesor/materias">Mis materias </a>
                            </li>
                        </ul>

                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-danger my-2 my-sm-0" type="submit">Log out</button>
                        </form>
                    </div>                    
                </nav>
            </div>
        )
    }
}

export default DefaultNavBar;