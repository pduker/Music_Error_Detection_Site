import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./home.css";

export default class Home extends Component {
  render() {
    return (
        <div className="Home">
            <h2>Welcome to the Assignments</h2>
        <Button
          onClick={()=>
            history.push('/Assignment1')
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Assignment 1</Button>
      </div>
    );
  }
}
