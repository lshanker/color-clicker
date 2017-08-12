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
            </div>
        )
    }
}


export default ButtonPage