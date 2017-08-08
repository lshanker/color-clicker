import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import base from './base'

class App extends Component {

  constructor() {
    super()


    this.state = {
      colors: { green: 0 } //see Firebase 
    }
  }

  componentDidMount(){

    base.syncState(
      'colors',
      {
        context: this,
        state: 'colors'
      }
    )

  }

  render() {
    return (
     <div>
        <p>Green counter: {this.state.colors.green} </p>
        <p>Yellow counter: {this.state.colors.yellow} </p>
        <p>Red counter: {this.state.colors.red} </p>
        <button onClick = {() => this.increment('green')}>Increase green counter</button>
        <button onClick = {() => this.increment('yellow')}>Increase yellow counter</button>
        <button onClick = {() => this.increment('red')}>Increase red counter</button>
      </div>
    );
  }

  increment(color){
    const count = this.state.colors[color]

    let colors = this.state.colors
    colors[color] = count + 1

    this.setState({colors})
  }

}

export default App;
