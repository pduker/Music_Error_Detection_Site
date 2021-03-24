import React, { Component } from "react";
import { Button } from "./../Components/Button";
import history from "./../history";
import "./home.css";
import { withRouter } from "react-router-dom";

class Home extends Component {
  render() {
    return (
        <div className="Home">
            <h2 style={{color:'white'}}>Welcome to Music Error Detection Practice Quiz</h2>
            <h3 style={{color:'white'}}>Click on the Assignment to begin!</h3>
            <div>
        <Button
          onClick={()=> {
            history.push('/Assignment1');
            history.go();
          }
          }
          type = "button"
          buttonStyle = "btn--primary--solid"
          buttonSize = "btn--large"
        >Assignment 1</Button> 
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
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




<address>
  Visit us at: <a href="https://www.udel.edu/apply/undergraduate-admissions/major-finder/music-education/">UD Music Education</a> 
  <div>
  For Questions Email: <a href="pduker@udel.edu">Professor Phil Duker</a>
  </div>
</address>





      </div>
    );
  }
}

export default withRouter(Home);