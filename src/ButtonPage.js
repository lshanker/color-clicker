import React, { Component } from 'react';
import './ButtonPage.css';

class ButtonPage extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className = "buttonPage">
                <div className = 'buttonContainer'>
                    <button className = "bigButton" onClick = {this.props.incrementPoints}></button>
                </div>
                <div>
                    <div className = "pointContainer">
                        <p className = "pointCount">Points: {this.props.possessions.points}</p>
                        <button className = "giveButton" onClick = {() => {this.props.incrementTeam(this.props.possessions.color, this.props.possessions.points)}}>Give points to team <i className="fa fa-hand-o-right" aria-hidden="true"></i></button>
                    </div>
                    <p className = "score">Your Score: {this.props.possessions.given}______</p>
                    <p className = "teamCount">Team Points: {this.props.colors[this.props.possessions.color]}______</p>
                </div>
                
           </div>
        )
    }

}


export default ButtonPage