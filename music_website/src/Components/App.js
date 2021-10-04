import React from 'react';
import './../Styles/App.css';
import Routes from '../Scripts/Routes';
import useMousePosition from '../Scripts/MousePosition';

function App() {
  const mouseStuff = useMousePosition();
  const placeX = mouseStuff[1];
  const placeY = mouseStuff[2];
  const divStyleP = {
    display: 'none',
    position: 'absolute',
    top: placeY - 19, //19 is 1/2 the size of the square hotspot
    left: placeX - 19,
    background: 'Orchid',
    opacity: '.5',
    border: '2px solid BlueViolet',
    width: '38px',
    height: '38px'}
    ;
  const divStyleR = {
    display: 'none',
    position: 'absolute',
    top: placeY-19,
    left: placeX-19,
    background: 'Pink',
    opacity: '.5',
    border: '2px solid Red',
    width: '38px',
    height: '38px'}
    ;
  const divStyleI = {
    display: 'none',
    position: 'absolute',
    top: placeY-19,
    left: placeX-19,
    background: 'AquaMarine',
    opacity: '.5',
    border: '2px solid Green',
    width: '38px',
    height: '38px'}
    ;
  return (
    <div className="App">
      <Routes />
      <div id="shapeP" style={divStyleP}> </div>
      <div id="shapeR" style={divStyleR}> </div>
      <div id="shapeI" style={divStyleI}> </div>
    </div>
    
  );
}

export default App;