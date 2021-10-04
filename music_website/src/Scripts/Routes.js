import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../Components/Home";
import Assignment1 from "../Assignments/Assignment1";
import Assignment2 from "../Assignments/Assignment2";
import Assignment3 from "../Assignments/Assignment3";
import Assignment4 from "../Assignments/Assignment4";
import Assignment5 from "../Assignments/Assignment5";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Assignment1" component={Assignment1} />
                    <Route path="/Assignment2" component={Assignment2} />
                    <Route path="/Assignment3" component={Assignment3} />
                    <Route path="/Assignment4" component={Assignment4} />
                    <Route path="/Assignment5" component={Assignment5} />
                </Switch>
            </Router>
            </div>
        )
    }
}