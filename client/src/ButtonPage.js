import React, { Component } from 'react';
import './ButtonPage.css';

import firebase from 'firebase/app'
import 'firebase/database'
import base, {auth} from './base'

import Adder from './Adder'

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
    
        var rows = [];
        var c = 0;
        Object.keys(this.props.items).forEach((cur) => {
            rows.push(<Adder key = {c} owned = {this.props.items[cur].owned} value = {parseInt(cur.substring(3))} teamColor = {this.props.possessions.color}/>)
            c++;
        })

        return(
            <div className = "buttonPage">
                <div className = "adderContainer">
                    <div className = "rowAndTitleContainer">
                    <p className = "itemTitle" style = {{color: this.props.possessions.color}}>Adders</p>
                    {rows}
                    </div>
                </div>
                <div className = 'buttonContainer'>
                    <button className = "bigButton" onClick = {this.props.incrementPoints}  style = {{backgroundColor: this.props.possessions.color}}><i className="fa fa-hand-pointer-o" aria-hidden="true"></i></button>
                </div>
                <div className = "interestContainer">
                </div>
               
                <div>
                    <div className = "pointContainer">
                        <p className = "pointCount">Points: {this.props.possessions.points}</p>
                        <button className = "giveButton"  style = {{color: this.props.possessions.color, border: `1px solid ${this.props.color}`}} onClick = {() => {this.props.incrementTeam(this.props.possessions.color, this.props.possessions.points)}}>Give points to team <i className="fa fa-hand-o-right" aria-hidden="true"></i></button>
                        <p className = "score"  style = {{color: this.props.possessions.color}}>Your Score: {this.props.possessions.given}</p>
                        <p className = "test">While you were away you earned {this.props.newPoints} points!</p>
                    </div>
                </div>
                
           </div>
        )
    }

}


export default ButtonPage