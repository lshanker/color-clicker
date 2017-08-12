import React, { Component } from 'react';
import './ButtonPage.css';

class ButtonPage extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className = 'buttonPage'>
                <button className = "bigButton" onClick = {this.props.incrementPoints}><p>Click Here!</p></button>
                <p className = "pointCount">Points: {this.props.possessions.points}</p>
                <p className = "pointCount">Team Points: {this.props.colors[this.props.possessions.color]}______</p>
                <button className = "giveButton" onClick = {() => {this.props.incrementTeam(this.props.possessions.color, this.props.possessions.points)}}>Give points to team</button>
            </div>
        )
    }

}


export default ButtonPage