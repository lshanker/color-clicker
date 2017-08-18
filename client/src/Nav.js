import React, { Component } from 'react';
import './Nav.css';

import base from './base'

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
        var elements = document.querySelectorAll(".teamColor")
        for(var i = 0; i<elements.length; i++){
            elements[i].setAttribute("style", `color: ${this.props.currentWinner}`)
        }
        

        var bkgElements = document.querySelectorAll(".teamColorBackground")
        for(i = 0; i<bkgElements.length; i++){
            bkgElements[i].setAttribute("style", `background-color: ${this.props.currentWinner}`)
        }

        var borRightElements = document.querySelectorAll(".teamColorBorderR")
        for(i = 0; i<borRightElements.length; i++){
            borRightElements[i].setAttribute("style", `border-right: solid 1px ${this.props.currentWinner}`)
        }

        var borTopElements = document.querySelectorAll(".teamColorBorderT")
        for(i = 0; i<borTopElements.length; i++){
            borTopElements[i].setAttribute("style", `border-top: solid 1px ${this.props.currentWinner}`)
        }
        
        
        
        

        return(
            <div className = "nav teamColorBorderR">
                <div className = "coverShadow teamColorBackground">  <div className = "time">{(this.state.seconds === null) ? null : <p><i className="fa fa-clock-o" aria-hidden="true"></i>{this.state.days}d {this.state.hours}h {this.state.minutes}m {this.state.seconds}s</p>}</div></div>
                <div className = {`title`} onClick={() => this.props.history.push('/home')}><p className = "teamColor">Color Clicker.</p></div>
                <div className = "border teamColorBorderT"></div>
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