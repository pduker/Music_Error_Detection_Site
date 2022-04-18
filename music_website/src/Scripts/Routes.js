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

//there has to be a better way than individually importing each file
//import audio1 from "../Resources/Audio/Example1.m4a";
//import sheetMusic1 from "../Resources/Images/example1.jpg";

import AssignmentTemplate2 from "../Assignments/AssignmentTemplate2";

// Level 1 Exercise 1
const L1E1_DATA = {
  name: "Level 1 Exercise 1",
  sound: require("../Assignments/Level_1/Exercise_1/sound.mp3"),
  display: require("../Assignments/Level_1/Exercise_1/display2.png"),
  shapes: require("../Assignments/Level_1/Exercise_1/shapes.json"),
};
// Level 1 Exercise 2
const L1E2_DATA = {
  name: "Level 1 Exercise 2",
  sound: require("../Assignments/Level_1/Exercise_2/sound.mp3"),
  display: require("../Assignments/Level_1/Exercise_2/display2.png"),
  shapes: require("../Assignments/Level_1/Exercise_2/shapes.json"),
};
// Level 2 Exercise 1
const L2E1_DATA = {
  name: "Level 2 Exercise 1",
  sound: require("../Assignments/Level_2/Exercise_1/sound.mp3"),
  display: require("../Assignments/Level_2/Exercise_1/display2.png"),
  shapes: require("../Assignments/Level_2/Exercise_1/shapes.json"),
};
// Level 2 Exercise 2
const L2E2_DATA = {
  name: "Level 2 Exercise 2",
  sound: require("../Assignments/Level_2/Exercise_2/sound.mp3"),
  display: require("../Assignments/Level_2/Exercise_2/display2.png"),
  shapes: require("../Assignments/Level_2/Exercise_2/shapes.json"),
};
// Level 2 Exercise 3
const L2E3_DATA = {
  name: "Level 2 Exercise 3",
  sound: require("../Assignments/Level_2/Exercise_3/sound.mp3"),
  display: require("../Assignments/Level_2/Exercise_3/display2.png"),
  shapes: require("../Assignments/Level_2/Exercise_3/shapes.json"),
};
// Level 3 Exercise 1
const L3E1_DATA = {
  name: "Level 3 Exercise 1",
  sound: require("../Assignments/Level_3/Exercise_1/sound.mp3"),
  display: require("../Assignments/Level_3/Exercise_1/display2.png"),
  shapes: require("../Assignments/Level_3/Exercise_1/shapes.json"),
};
// Level 3 Exercise 2
const L3E2_DATA = {
  name: "Level 3 Exercise 2",
  sound: require("../Assignments/Level_3/Exercise_2/sound.mp3"),
  display: require("../Assignments/Level_3/Exercise_2/display2.png"),
  shapes: require("../Assignments/Level_3/Exercise_2/shapes.json"),
};
// Level 4 Exercise 1
const L4E1_DATA = {
  name: "Level 4 Exercise 1",
  sound: require("../Assignments/Level_4/Exercise_1/sound.m4a"),
  display: require("../Assignments/Level_4/Exercise_1/display2.png"),
  shapes: require("../Assignments/Level_4/Exercise_1/shapes.json"),
};
// Level 5 Exercise 1
const L5E1_DATA = {
  name: "Level 5 Exercise 1",
  sound: require("../Assignments/Level_5/Exercise_1/sound.m4a"),
  display: require("../Assignments/Level_5/Exercise_1/display2.png"),
  shapes: require("../Assignments/Debug/placeholder.json"),
};

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

            <Route
              path="/Level1Exercise1"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L1E1_DATA} />
              )}
            />
            <Route
              path="/Level1Exercise2"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L1E2_DATA} />
              )}
            />

            <Route
              path="/Level2Exercise1"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L2E1_DATA} />
              )}
            />
            <Route
              path="/Level2Exercise2"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L2E2_DATA} />
              )}
            />
            <Route
              path="/Level2Exercise3"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L2E3_DATA} />
              )}
            />

            <Route
              path="/Level3Exercise1"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L3E1_DATA} />
              )}
            />
            <Route
              path="/Level3Exercise2"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L3E2_DATA} />
              )}
            />

            <Route
              path="/Level4Exercise1"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L4E1_DATA} />
              )}
            />

            <Route
              path="/Level5Exercise1"
              render={(props) => (
                <AssignmentTemplate2 {...props} data={L5E1_DATA} />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
