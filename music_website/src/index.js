import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Button } from "./Components/Button";

function App() {
  return (
    <div className="App">
      <Button
        onClick={()=> {
          console.log("clicked")
        }}
        type = "button"
        buttonStyle = "btn--primary--solid"
        buttonSize = "btn--large"
      >Click</Button>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
