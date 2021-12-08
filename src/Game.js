import './App.css';
//import Beam from './beam'
import React from 'react';
import props from 'prop-types';

export default class Game extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      x: 0,
      y: 0,
      maxHp: 100000,
      hp: 0,
      stamina: 100,
      damageOn: true,
      beams: [],
      spinnybois: []
    }
    
    this.onMouseMove = this.onMouseMove.bind(this);
    this.Damage = this.Damage.bind(this);
    this.Test = this.Test.bind(this);
    this.GenerateBeams = this.GenerateBeams.bind(this);
  }

  componentDidMount () {
    //this.setState({beams.length: this.state.totalBeams});
    /*setTimeout(function() { //Start the timer
      this.state.beams.push(1);
      this.state.beams.push(1);
      this.state.beams.push(1);
      for(let i = 0; i < this.state.beams.length; i++)
      {
        this.BeamMechanic(i + 1);
      }
    }.bind(this), 1500)*/
    
    const st = document.getElementById('staminabar');
    let oldX = 0, oldY = 0, staminaChange = 0;
    this.setState({hp: this.state.maxHp})

    const eye = document.getElementById('eyeball');

    const pointer = document.getElementById('pointer');

    setInterval(() => { //stamina stuff
      staminaChange = 1;
      
      if(oldX === this.state.x && oldY === this.state.y)
      {
        staminaChange -= 5;
        this.setState({damageOn: false})
      } else {
        this.setState({damageOn: true})
        oldX =  this.state.x;
        oldY =  this.state.y;
      }
      if((this.state.stamina < 100 && this.state.stamina > 0) || staminaChange < 0)
      {
        this.setState({stamina: this.state.stamina + staminaChange})
        st.style.width = 150 / 100 * (this.state.stamina + staminaChange) + "px";
      } 
      if(this.state.stamina <= 0)
      {
        this.setState({damageOn: true})
        this.Damage();
        this.setState({stamina: 100})
        st.style.width = "150px";
      }

      //eyeball
      console.log(this.state.x / 7.5)

      eye.style.top = (this.state.y / 600 * 35) + 265.5  + "px";
      eye.style.left = (this.state.x / 600 * 35) + 265.5 + "px";

      //player

      pointer.style.top = this.state.y + "px";
      pointer.style.left = this.state.x + "px";
      
    }, 10);

    for(let i = 0; i < this.state.spinnybois.length; i++)
    {
      this.SpinnyBoisMechanic(i + 1);
    }
    for(let i = 0; i < this.state.beams.length; i++)
    {
      this.BeamMechanic(i + 1);
    }
  }
  
  onMouseMove(e) {
    this.setState({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  }

  Test = () => {
    alert("it works " + this.state.maxHp)
  }

  GenerateBeams = () => {
    const beam = (
      <div>
      {this.state.beams.map((somebeam, i) => <div key={i} class="beam" id = {"beam" + (i + 1)}>
      <div className="beamBody warn" id = {"warn" + (i + 1)}>{i}</div>
      <div className="beamBody ray" id = {"ray" + (i + 1)} onMouseEnter = {this.Damage}></div>
      </div>)}
      </div>
    )
    
    /*for(var i = 0; i < 3; i++) {
      beam = (<div class="beam" id = "beam1">
      <div className="beamBody" id = "warn"></div>
      <div className="beamBody" id = "ray" onMouseEnter = {this.Damage}></div>
    </div>
    )
    }*/

    return beam;
    
  }

  GenerateSpinnies = () => {
    const spinnies = (
      <div>
      {this.state.spinnybois.map((boi, i) => 
      <div key={i} className = "spinnyBoi" id = {"boi" + (i +1)}>
        <div  onMouseEnter = {this.Damage} class = "spinnyBody" id = {"body" + (i + 1)}>
          <div className = "spinnyEnd"></div>
        </div>
      </div>)}
      </div>
    )

    return spinnies;
  }

  SpinnyBoisMechanic = (i) => {
    const spinnyBoi = document.getElementById('boi' + i);
    const body = document.getElementById('body' + i);
    let degrees = 0, min = 45, max = 300;

    setInterval(() => { 

      degrees = degrees + (Math.random() * ((degrees + max) - (degrees + min)) + (degrees + min) - degrees) * (Math.random() - 0.5)
      
      spinnyBoi.style.transform = "rotate(" + degrees + "deg)";
      body.style.width = Math.random() * 255 + "px";
      //body.style.background = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
    }, 1000);
  }

  BeamMechanic = (i) => {
    let x = 0, y = 0, rot = 0;
    const b1 = document.getElementById('beam' + i);
    const ray = document.getElementById('ray' + i);
    const warn = document.getElementById('warn' + i);
    setInterval(() => { 
      ray.style.display = "none";
      warn.style.display = "block";
      x = Math.random() * 600;
      y = Math.random() * 600;
      rot = Math.random() * 360;
      b1.style.top = y + "px";
      b1.style.left = x + "px";
      b1.style.transform = "rotate(" + rot + "deg)";
      setTimeout(function() { //Start the timer
        ray.style.display = "block";
        warn.style.display = "none";
      }.bind(this), 500)
    }, 700);
  }

  Damage = () => {
    if(this.state.damageOn)
    {
      if(this.state.hp - 1 === 0) {
        alert("hi hi ha ha")
        window.location.reload();
      }

      this.setState({hp: this.state.hp - 1});

      const bg = document.querySelector('body');
      const hp = document.getElementById('hbar');

      bg.style.transition = "0.05s";
      bg.style.background = "red";

      hp.style.width = 150 / this.state.maxHp * (this.state.hp - 1) + "px";

      /*const eye = document.getElementById('eyeball');

      eye.style.top = 0;
      eye.style.bottom = 0;*/

      setTimeout(function() { //Start the timer
        bg.style.transition = "1s";
        bg.style.background = "black";
      }.bind(this), 100)
    }
  }

  render () {
    return (
      <div class="Game">
        <div class = "bars">
          <div className="health">
            <div className = "hpcounter">{this.state.hp}</div>
            <div id = "hbar"></div>
          </div>
          <div className="stamina">
            <div className = "staminacounter">{this.state.stamina}</div>
            <div id = "staminabar"></div>
          </div>
        </div>
        <div class="GameBoundaries" onMouseMove = {this.onMouseMove} onPointerLeave = {this.Damage}>
          {this.GenerateBeams()}
          {this.GenerateSpinnies()}
          <div id = "pointer"></div>
          <div className = "center" onMouseMove = {this.Damage}>
            <div id="eyeball"></div>
          </div>
        </div>
      </div>
    );
  }
}