import React, { Component } from 'react';
import './ButtonPage.css';

import firebase from 'firebase/app'
import 'firebase/database'
import base, {auth} from './base'

class ButtonPage extends Component{
    constructor(){
        super()

        var interval;
    }


    componentDidMount(){
        this.interval = setInterval(this.props.checkItems, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
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
                        <p className = "score">Your Score: {this.props.possessions.given}</p>
                        <p className = "test">While you were away you earned {this.props.newPoints} points!</p>
                    </div>
                    <p className = "teamCount">Team Points: {this.props.colors[this.props.possessions.color]}______</p>
                </div>
                
           </div>
        )
    }

}


export default ButtonPage