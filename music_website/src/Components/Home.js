import React, { Component } from "react";
import { Button } from "./Button";
import history from "./../Scripts/history";
import "./../Styles/home.css";
import { withRouter } from "react-router-dom";
import headerImg from "./../Resources/Images/Header.png";

import { LEVEL_DATA } from "../Exercises/LevelData";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <header>
          <img id="img1" className="center-fit" src={headerImg} alt="Header" />
        </header>
        <h2 style={{ color: 'white' }}>Welcome to the Music Error Detection Practice Quiz!</h2>
        <h3 style={{ color: 'white' }}>Click on one of the levels below to begin.</h3>

        <div>
          <Button
            onClick={() => {
              history.push('/Debug');
            }
            }
            type="button"
            buttonStyle="home-page-button"
            buttonSize="btn--large"
          >Debug</Button>
        </div>

        {
          LEVEL_DATA.map((data) => (
            <div>
              <Button
                onClick={() => {
                  history.push(`/Level${data.number}`);
                }
                }
                type="button"
                buttonStyle="home-page-button"
                buttonSize="btn--large"
              >Level {data.number}{data.description}</Button>
            </div>
          ))
        }

        <footer>
          <address>
            Visit us at: <a href="https://www.udel.edu/apply/undergraduate-admissions/major-finder/music-education/">UD Music Education</a>
            <div>
              For questions please email: <a href="mailto:pduker@udel.edu">Professor Phil Duker</a>
            </div>
            <br></br>
          </address>
        </footer>

      </div>
    );
  }
}

export default withRouter(Home);