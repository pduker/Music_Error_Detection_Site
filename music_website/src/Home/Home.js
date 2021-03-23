import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./home.css";
import { withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
        <div className="Home">
            <h2>Welcome to the Assignments</h2>
        <Button
          onClick={()=> {
            // document.getElementsByClassName('hotspot').display = "block";
            history.push('/Assignment1');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Assignment 1</Button>
        <Button
          onClick={()=> {
            history.push('/Assignment2');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Assignment 2</Button>
        <Button
          onClick={()=> {
            history.push('/Assignment3');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Assignment 3</Button>
        <Button
          onClick={()=> {
            history.push('/Assignment4');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Assignment 4</Button>
        <Button
          onClick={()=> {
            history.push('/Assignment5');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Assignment 5</Button>
      </div>
    );
  }
}

export default withRouter(Home);