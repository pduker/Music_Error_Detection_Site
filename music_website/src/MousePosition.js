import { useState, useEffect } from "react";
import history from "./history";
var placeX = 0;
var placeY = 0;

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = ev => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  const handleClick = ev => {
    if (history.location.pathname==="/Assignment1"){
      if ((ev.clientX < (document.getElementById("img1").x + document.getElementById("img1").width) 
      && ev.clientY < (document.getElementById("img1").y + document.getElementById("img1").height) 
      && ev.clientX > (document.getElementById("img1").x) 
      && ev.clientY > (document.getElementById("img1").y))){
        placeX = ev.clientX;
        placeY = ev.clientY;
      }
    }
    if (history.location.pathname==="/Assignment2"){
      if ((ev.clientX < (document.getElementById("img2").x + document.getElementById("img2").width) 
      && ev.clientY < (document.getElementById("img2").y + document.getElementById("img2").height) 
      && ev.clientX > (document.getElementById("img2").x) 
      && ev.clientY > (document.getElementById("img2").y))){
        placeX = ev.clientX;
        placeY = ev.clientY;
      }
    }
    if (history.location.pathname==="/Assignment3"){
      if ((ev.clientX < (document.getElementById("img3").x + document.getElementById("img3").width) 
      && ev.clientY < (document.getElementById("img3").y + document.getElementById("img3").height) 
      && ev.clientX > (document.getElementById("img3").x) 
      && ev.clientY > (document.getElementById("img3").y))){
        placeX = ev.clientX;
        placeY = ev.clientY;
      }
    }
    if (history.location.pathname==="/Assignment4"){
      if ((ev.clientX < (document.getElementById("img4").x/1.5 + document.getElementById("img4").width) 
      && ev.clientY < (document.getElementById("img4").y/1.5 + document.getElementById("img4").height) 
      && ev.clientX > (document.getElementById("img4").x/1.5) 
      && ev.clientY > (document.getElementById("img4").y/1.5))){
        placeX = ev.clientX;
        placeY = ev.clientY;
      }
    }
    if (history.location.pathname==="/Assignment5"){
      if ((ev.clientX < (document.getElementById("img5").x/1.5 + document.getElementById("img5").width) 
      && ev.clientY < (document.getElementById("img5").y/1.5 + document.getElementById("img5").height) 
      && ev.clientX > (document.getElementById("img5").x/1.5) 
      && ev.clientY > (document.getElementById("img5").y/1.5))){
        placeX = ev.clientX;
        placeY = ev.clientY;
      }
    }
    //placeX = ev.clientX;
    //placeY = ev.clientY;
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleClick);
    window.addEventListener("mouseup", handleClick);

    return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("mousedown", handleClick);
        window.removeEventListener("mouseup", handleClick);
    }
  }, []);

  return [mousePosition,placeX,placeY];
};

export default useMousePosition;