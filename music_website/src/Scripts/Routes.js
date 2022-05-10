import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../Components/Home";

import Debug from "../Exercises/Debug";
import history from "./history";

import LevelTemplate from "../Components/LevelTemplate";
import ExerciseTemplate from "../Components/ExerciseTemplate";

import { LEVEL_DATA } from "../Exercises/LevelData";

const DEBUG_DATA = {
  "number": 0,
  "description": " - debug exercise preview",
  "maxRecommendedPlays": 2,
  "exercises": [
    {
      "number": 0,
      "sound": require("../Exercises/Debug/sound.mp3"),
      "display": require("../Exercises/Debug/display2.png"),
      "shapes": require("../Exercises/Debug/shapes.json")
    }
  ]
};

const DEBUG_EXERCISES = DEBUG_DATA["exercises"][0];


export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/Debug" component={Debug} />

            <Route path="/DebugPreview" render={(props) => (<ExerciseTemplate {...props} data={DEBUG_EXERCISES} levelData={DEBUG_DATA} />)} />

            {
              LEVEL_DATA.map(
                (levelData) => (
                  <Route path={`/Level${levelData.number}`} render={(props) => (<LevelTemplate {...props} data={levelData} />)} />
                )
              )
            }

            {
              LEVEL_DATA.map((levelData) => (
                levelData.exercises.map((exerciseData) => (
                  <Route path={`/Level${levelData.number}Exercise${exerciseData.number}`} render={(props) => (<ExerciseTemplate {...props} data={exerciseData} levelData={levelData} />)} />
                ))
              )
              )
            }
          </Switch>
        </Router>
      </div>
    );
  }
}
