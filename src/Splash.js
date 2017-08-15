import React, { Component } from 'react';
import './Splash.css'
import BottomBar from './BottomBar'
import base, {auth} from './base'

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
        
           
                this.setState({secondsRemaining: this.state.secondsRemaining - 1});
        
                this.setState({days: Math.floor(this.state.secondsRemaining/(60 * 60 * 24))})
                this.setState({hours: Math.floor((this.state.secondsRemaining - this.state.days*60*60*24)/(60 * 60))})
                this.setState({minutes: Math.floor((this.state.secondsRemaining - this.state.days*60*60*24 - this.state.hours*60*60)/(60))})
                this.setState({seconds: Math.floor((this.state.secondsRemaining - this.state.days*60*60*24 - this.state.hours*60*60 - this.state.minutes*60))})
        
                if (this.state.secondsRemaining <= 0) {
                  clearInterval(this.interval);
                }
              }
        
              componentWillMount(){
                base.fetch('deadline', {
                    context: this,
                  }).then(data => {
                      console.log('here 1')
                      console.log(data)
                    this.setState({deadline: data})
                    console.log(this.state.deadline-Date.now())
                    this.setState({secondsRemaining: Math.floor((this.state.deadline - Date.now())/1000)})
                  })
              }
        
            componentDidMount = () => {
            
                console.log(this.state.deadline)
             
                this.interval = setInterval(this.tick, 1000);
              }
        
              componentWillUnmount = () =>{
                clearInterval(this.interval);
              }

    render(){
        return (
            <div>
                <div className="page-wrap">
                    <div className={`content ${this.props.currentWinner}Text`} onClick={() => this.props.history.push('/home')}>
                        <p className="titlea">Color Clicker.</p>
                    </div>
                </div>
                    <div className={`${this.props.currentWinner} a`}>
                        <div className = "squareContainera">
                        {this.props.colorScores.map((cur, i) => <BottomBar key = {i} index = {i} color = {cur} points = {this.props.colors[cur]}/>)}
                        </div>
                    </div>

                    <div className = "timea">{(this.state.seconds === 0) ? null : <p>{this.state.days}d {this.state.hours}h {this.state.minutes}m {this.state.seconds}s</p>}</div>

            </div>
        )
    }
}

export default Splash