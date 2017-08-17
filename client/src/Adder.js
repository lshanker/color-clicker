import React, { Component } from 'react';
import './Adder.css';

class Adder extends Component{
    render(){
        return(
            <div className = "adderRow">
                <div className = "adder" style = {{backgroundColor: this.props.teamColor}}>
                    {this.props.value}                     
                </div>
                <p>x {this.props.owned} <p>= {this.props.value * this.props.owned}p/min</p></p>
            </div>
        )
    }
}

export default Adder