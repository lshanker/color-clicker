import React, { Component } from 'react';
import './ButtonPage.css';

import Adder from './Adder'

class ButtonPage extends Component{


    componentDidMount(){
        this.interval = setInterval(this.props.checkItems, 1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    render(){
    
        var adderRows = [];
        var multiplierRows = [];
        var c = 0;

        var times = ['min', 'hr', 'day', '12hr', 'day', '36hr']
        Object.keys(this.props.items).forEach((cur) => {
            if(cur.substring(0, 3) === 'add'){
              adderRows.push(<Adder key = {c} time = {times[c]} type = "add" owned = {this.props.items[cur].owned} value = {parseInt(cur.substring(3), 10)} teamColor = {this.props.possessions.color}/>)
            }else{
              multiplierRows.push(<Adder key = {c} time = {times[c]} type = "mul" owned = {this.props.items[cur].owned} value = {`1.${parseInt(cur.substring(3), 10)}`} teamColor = {this.props.possessions.color}/>)
            }

            c++;
        })

        c = 0;
        Object.keys(this.props.items).forEach((cur) => {
            
            c++;
        })

        return(
            <div className = "buttonPage">
                <div className = "adderContainer">
                    <div className = "rowAndTitleContainer">
                    <p className = "itemTitle" style = {{color: this.props.possessions.color}}>Adders</p>
                    {adderRows}
                    </div>
                </div>
                <div className = 'buttonContainer'>
                    <button className = "bigButton" onClick = {this.props.incrementPoints}  style = {{backgroundColor: this.props.possessions.color}}><i className="fa fa-hand-pointer-o" aria-hidden="true"></i></button>
                </div>
                <div className = "adderContainer">
                    <div className = "rowAndTitleContainer">
                    <p className = "itemTitle" style = {{color: this.props.possessions.color}}>Multipliers</p>
                    {multiplierRows}
                    </div>
                </div>
               
                <div>
                    <div className = "pointContainer">
                        <p className = "pointCount" style = {{backgroundColor: this.props.possessions.color}}>Points: {this.props.possessions.points}</p>
                        <div className = "widthContainer">
                            <button className = "giveButton"  style = {{color: this.props.possessions.color, border: `1px solid ${this.props.possessions.color}`}} onClick = {() => {this.props.incrementTeam(this.props.possessions.color, this.props.possessions.points)}}>Give points to team <i className="fa fa-hand-o-right" aria-hidden="true"></i></button>
                        </div>
                        <div className = "widthContainer">
                            <p className = "score"  style = {{color: this.props.possessions.color, border: `1px solid ${this.props.possessions.color}`, boxShadow: `0px 0px 5px ${this.props.possessions.color} inset`}}>Your Score: {this.props.possessions.given}</p>
                        </div>
                    </div>
                </div>
                
           </div>
        )
    }

}


export default ButtonPage