import React, { Component } from 'react';
import './Splash.css'
import BottomBar from './BottomBar'
import base, {auth} from './base'

import ScoreSquare from './ScoreSquare'

class Splash extends Component {
    constructor(){
        super()

        this.state = {
            secondsRemaining: 604800,
            seconds: 0,
            minutes: 0,
            hours: 0,
            days: 0
        }
    }

   
    tick = () => {
        var secondsRemaining = Math.floor((this.state.deadline - Date.now())/1000)

        if (secondsRemaining <= 0) {
            secondsRemaining = 0;
          //clearInterval(this.interval);
        }
        
        this.setState({days: Math.floor(secondsRemaining/(60 * 60 * 24))})
        this.setState({hours: Math.floor((secondsRemaining - this.state.days*60*60*24)/(60 * 60))})
        this.setState({minutes: Math.floor((secondsRemaining - this.state.days*60*60*24 - this.state.hours*60*60)/(60))})
        this.setState({seconds: Math.floor((secondsRemaining - this.state.days*60*60*24 - this.state.hours*60*60 - this.state.minutes*60))})

       
      }
              componentWillMount(){
                base.fetch('deadline', {
                    context: this,
                  }).then(data => {
                    this.setState({deadline: data})
                  })
        
                base.syncState('deadline', {
                    context: this,
                    state: 'deadline'
                })
              }
        
            componentDidMount = () => {
                this.interval = setInterval(this.tick, 1000);
              }
        
              componentWillUnmount = () =>{
                clearInterval(this.interval);
              }

    render(){
        var elements = document.querySelectorAll(".teamColorBackground")
        for(var i = 0; i<elements.length; i++){
            console.log(this.props.currentWinner)
            elements[i].setAttribute("style", `background-color: ${this.props.currentWinner}`)
        }
        
        return (
            <div>
                <div className="page-wrap">
                    <div className = {`content ${this.props.currentWinner}Text`} style = {{border: "5px solid " + this.props.currentWinner}} >
                        <p className="titlea">Color Clicker.</p>
                    </div>
                </div>
                <div className = 'splashSquaresContainer'>
                    {this.props.colorScores.map((cur, i) => <ScoreSquare key = {i} index = {i} color = {cur} points = {this.props.colors[cur]} showPoints = {true} splash = {true}/>)}
                </div>
               
                    <div className = "enterContainer">
                        <button className = {['enter', 'teamColorBackground'].join(' ')} onClick={() => this.props.history.push('/home')}>Enter Game</button>
                    </div>

                    <div className = "countdownContainer">
                        <div>{(this.state.seconds === null) ? null : <p className = "countdown">{this.state.days}d {this.state.hours}h {this.state.minutes}m {this.state.seconds}s</p>}</div>
                    </div>
            </div>
        )
    }
}
/*     <div className={`${this.props.currentWinner} a`}>
                   
                    </div>

                    
                    */
export default Splash