import React, { Component } from 'react';
import './FirstTimeSetup.css';

import ScoreSquare from './ScoreSquare'

class FirstTimeSetup extends Component{
    constructor(){
        super();

        this.state = {
            currentPage: 
            <div id = 'page1'>
                <p className = 'instructions'>To get started, enter a username</p>
                <p className = 'warning'>Other users will be able to see this</p>
                 <form id = "usernameForm" onSubmit = {(ev) => {this.continuePressed(ev)}}>
                        <input type = "text" name = "username"></input>
                        <button type  ="submit" >Continue <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
               </form>
            </div>
        }
    }

    render(){
        return(
            <div className = "setupContainer">
                <div className = "overlay">
                </div>
                <div className = 'popupBox'>
                <h1>Welcome to Color Clicker!</h1>
                    {this.state.currentPage}
                </div>
            </div>
        )

        
    }

    continuePressed = (ev) => {
        ev.preventDefault();

        var form = document.getElementById('usernameForm')
        var username = form.username.value;
        if(username===""){
            alert('Please enter a username.')
        }else{
        this.setState({username})

        var squares = [];
        var i = 0;
        Object.keys(this.props.colors).forEach((color) => {squares.push(<button key = {i} className = "squareButton" onClick = {(ev) => {this.colorChosen(ev)}}><ScoreSquare key = {i} index = {i} color = {color} points = {null} showPoints = {false} splash = {false} setup = {true}/></button>); i++})

        const page2 =   
        <div>
             <p className = 'instructions'>Now choose a team</p>
             <p className = 'warning'>You won't be able to change this later</p>
             <div className = "squares">
              {squares}
            </div>
        </div>

        this.setState({currentPage: page2})
        }
         
    }

    colorChosen = (ev) => {
        this.setState({color: ev.target.getAttribute('name')})

        const page3 =
        <div>
            <p className = 'instructions'>You're ready to start playing! <br/>Earn points by clicking the big button on your home page. Spend points in the shop, or give them to your team to increase your score. <br/>Giving your points at the right time is key.</p>
            <p className = 'warning'>The game resets every week, so if your team doesn't win you can always try again.</p>
            <button className = "start" onClick = {this.enterGame}>Enter Game</button>
        </div>

        this.setState({currentPage: page3})
    }

    enterGame = () => {
        this.props.setup(this.state.username, this.state.color);

    }


}

export default FirstTimeSetup