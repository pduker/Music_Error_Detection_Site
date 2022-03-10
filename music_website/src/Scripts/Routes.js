import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../Components/Home";
import Level1Question1 from "../Assignments/Level1Question1";
import Level1Question2 from "../Assignments/Level1Question2";
import Level2Question1 from "../Assignments/Level2Question1";
import Level2Question2 from "../Assignments/Level2Question2";
import Level2Question3 from "../Assignments/Level2Question3";
import Level3Question1 from "../Assignments/Level3Question1";
import Level3Question2 from "../Assignments/Level3Question2";
import Level4Question1 from "../Assignments/Level4Question1";
import Level4Question2 from "../Assignments/Level4Question2";
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
        return (
            <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/Level1" component={Level1} />
                    <Route path="/Level2" component={Level2} />
                    <Route path="/Level3" component={Level3} />
                    <Route path="/Level4" component={Level4} />
                    <Route path="/Level1Question1" component={Level1Question1} />
                    <Route path="/Level1Question2" component={Level1Question2} />
                    <Route path="/Level2Question1" component={Level2Question1} />
                    <Route path="/Level2Question2" component={Level2Question2} />
                    <Route path="/Level2Question3" component={Level2Question3} />
                    <Route path="/Level3Question1" component={Level3Question1} />
                    <Route path="/Level3Question2" component={Level3Question2} />
                    <Route path="/Level4Question1" component={Level4Question1} />
                    <Route path="/Level4Question2" component={Level4Question2} />
                    <Route path="/Debug" component={Debug} />
                    <Route path="/AssignmentTemplate" render={(props) => <AssignmentTemplate {...props} audioUrl={audio1} sheetMusic={sheetMusic1}/>} />

                </Switch>
            </Router>
            </div>
        )
    }
}