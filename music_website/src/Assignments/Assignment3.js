import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./assignment.css";
import { withRouter } from "react-router-dom";

class Assignment3 extends Component {
  render() {
    return (
        <div className="Assignment3">
            <h2>Assignment 3</h2>
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

export default withRouter(Assignment3);