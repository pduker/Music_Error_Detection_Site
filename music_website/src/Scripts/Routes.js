import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Home from "../Components/Home";

import Debug from "../Exercises/Debug";
import history from "./history";

import LevelTemplate from "../Components/LevelTemplate";
import ExerciseTemplate from "../Components/ExerciseTemplate";

import { LEVEL_DATA } from "../Exercises/LevelData";

export default class Routes extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />

            <Route path="/Debug" component={Debug} />

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
