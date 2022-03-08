import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../Components/Home";
import Assignment1 from "../Assignments/Assignment1";
import Assignment2 from "../Assignments/Assignment2";
import Assignment3 from "../Assignments/Assignment3";
import Assignment4 from "../Assignments/Assignment4";
import Assignment5 from "../Assignments/Assignment5";
import Debug from "../Assignments/Debug";
import history from './history';
import AssignmentTemplate from "../Components/AssignmentTemplate";
import Level1 from "../Components/Level1";
import Level2 from "../Components/Level2";
import Level3 from "../Components/Level3";
import Level4 from "../Components/Level4";


//there has to be a better way than individually importing each file
import audio1 from "../Resources/Audio/Example1.m4a";
import sheetMusic1 from "../Resources/Images/example1.jpg";

export default class Routes extends Component {
    render() {
        // let assignment1 = <AssignmentTemplate/>
        return (
            <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Level1" component={Level1} />
                    <Route path="/Level2" component={Level2} />
                    <Route path="/Level3" component={Level3} />
                    <Route path="/Level4" component={Level4} />
                    <Route path="/Assignment1" component={Assignment1} />
                    <Route path="/Assignment2" component={Assignment2} />
                    <Route path="/Assignment3" component={Assignment3} />
                    <Route path="/Assignment4" component={Assignment4} />
                    <Route path="/Assignment5" component={Assignment5} />
                    <Route path="/Debug" component={Debug} />
                    <Route path="/AssignmentTemplate" render={(props) => <AssignmentTemplate {...props} audioUrl={audio1} sheetMusic={sheetMusic1}/>} />

                </Switch>
            </Router>
            </div>
        )
    }
}