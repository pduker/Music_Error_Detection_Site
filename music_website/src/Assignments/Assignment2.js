import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";

class Assignment2 extends Component {
  render() {
    return (
        <div className="Assignment2">
            <h2>Assignment 2</h2>
        <Button
          onClick={()=> {
            history.push('/');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Go Back to Assignments</Button>
      </div>
    );
  }
}

export default withRouter(Assignment2);