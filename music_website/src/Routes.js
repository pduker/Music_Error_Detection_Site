import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home/Home";
import Assignment1 from "./Assignments/Assignment1";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Assignments" component={Assignment1} />
                </Switch>
            </Router>
            </div>
        )
    }
}