import './App.css';
import React from 'react';
import props from 'prop-types';

export default class Beam extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }

  componentDidMount () {
    this.props.Test();
    let x = 0, y = 0, rot = 0;
    const b1 = document.getElementById('beam1');
    const ray = document.getElementById('ray');
    setInterval(() => { 
      ray.style.display = "none";
      x = Math.random() * 600;
      y = Math.random() * 600;
      rot = Math.random() * 360;
      b1.style.top = y + "px";
      b1.style.left = x + "px";
      b1.style.transform = "rotate(" + rot + "deg)";
      setTimeout(function() { //Start the timer
        ray.style.display = "block";
      }.bind(this), 3000)
    }, 4000);
  }
  
  
  render () {
    return (
      <div class="beam" id = "beam1">
        <div className="beamBody" id = "ray" onMouseMove = {() => {this.props.Test()}}></div>
        <div className="beamBody" id = "warn"></div>
      </div>
    );
  }
}

