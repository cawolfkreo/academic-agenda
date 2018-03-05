import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Login from './components/comp_login';
import Profesor from './components/comp_profesor';
import Estudiante from './components/comp_estudiante';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Login} />

    <Route path='*' component={Login} />
    <Route path='profesor' component={Profesor} />
    <Route path='estudiante' component={Estudiante} />
  </Route>
);