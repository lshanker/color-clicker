import React, { Component } from 'react';
import './Nav.css';

import Timer from './Timer'
import base, {auth} from './base'

class Nav extends Component{
    constructor(){
        super()

        this.state = {
            secondsRemaining: 604800,
            seconds: null,
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
        return(
            <div className = {`nav ${this.props.currentWinner}Border`}>
                <div className = {`coverShadow ${this.props.currentWinner}`}>  <div className = "time">{(this.state.seconds === null) ? null : <p>{this.state.days}d {this.state.hours}h {this.state.minutes}m {this.state.seconds}s</p>}</div></div>
                <div className = {`title`} onClick={() => this.props.history.push('/home')}><p className={`${this.props.currentWinner}Text`}>Color Clicker</p><img src={require('./images/mouse-hand.png')} /></div>
                <div className = {`border ${this.props.currentWinner}Text`}></div>
                <div className = "menuOption" onClick={() => this.props.history.push('/home')}><p className = "menuOptionText"><i className = "fa fa-home"></i>Home</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/shop')} ><p  className = 'menuOptionText'><i className="fa fa-money"></i>Shop</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/scoreboard')}><p className = 'menuOptionText'><i className="fa fa-bar-chart" aria-hidden="true"></i>Scoreboard</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/loan')}><p className = 'menuOptionText' ><i className="fa fa-university" aria-hidden="true"></i>Loan</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/profile')}><p className = 'menuOptionText'><i className="fa fa-user" aria-hidden="true"></i>Profile</p></div>
            </div>
        )
    }
}


export default Nav