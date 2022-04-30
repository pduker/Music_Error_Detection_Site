import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../Components/Home";

import Debug from "../Assignments/Debug";
import history from "./history";
import AssignmentTemplate from "../Components/AssignmentTemplate";
import Level1 from "../Components/Level1";
import Level2 from "../Components/Level2";
import Level3 from "../Components/Level3";
import Level4 from "../Components/Level4";
import Level5 from "../Components/Level5";

//there has to be a better way than individually importing each file
//import audio1 from "../Resources/Audio/Example1.m4a";
//import sheetMusic1 from "../Resources/Images/example1.jpg";

import AssignmentTemplate2 from "../Assignments/AssignmentTemplate2";

import * as AssignmentData from "../Assignments/AssignmentData";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/Debug" component={Debug} />
            {/* <Route path="/AssignmentTemplate" render={(props) => <AssignmentTemplate {...props} audioUrl={audio1} sheetMusic={sheetMusic1} />} /> */}

            <Route path="/Level1" component={Level1} />
            <Route path="/Level2" component={Level2} />
            <Route path="/Level3" component={Level3} />
            <Route path="/Level4" component={Level4} />
            <Route path="/Level5" component={Level5} />

            <Route path="/Level1Exercise1" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L1E1_DATA} />)} />
            <Route path="/Level1Exercise2" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L1E2_DATA} />)} />

            <Route path="/Level2Exercise1" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L2E1_DATA} />)} />
            <Route path="/Level2Exercise2" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L2E2_DATA} />)} />
            <Route path="/Level2Exercise3" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L2E3_DATA} />)} />

            <Route path="/Level3Exercise1" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L3E1_DATA} />)} />
            <Route path="/Level3Exercise2" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L3E2_DATA} />)} />

            <Route path="/Level4Exercise1" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L4E1_DATA} />)} />

            <Route path="/Level5Exercise1" render={(props) => (<AssignmentTemplate2 {...props} data={AssignmentData.L5E1_DATA} />)} />
          </Switch>
        </Router>
      </div>
    );
  }
}
