import React, { Component } from 'react';
import './Adder.css';

class Adder extends Component{
    render(){
        if(this.props.type==='add'){
        return(
            <div className = "adderRow">
                <div className = "adder" style = {{backgroundColor: this.props.teamColor}}>
                    {this.props.value}                     
                </div>
                    <p className = "owned">x {this.props.owned} </p>
                    <p className = "rate">= {this.props.value * this.props.owned}p/{this.props.time}</p>
            </div>
        )
    }else{
        return(
         <div className = "adderRow">
            <div className = "adder" style = {{backgroundColor: this.props.teamColor}}>
                X {this.props.value}                     
            </div>
            <p className = "owned">x {this.props.owned} </p>
            <p className = "rate">= x{this.props.value * this.props.owned}/{this.props.time}</p>
        </div>
        )
    }
    }
}

export default Adder