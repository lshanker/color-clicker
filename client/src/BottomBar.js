import React, { Component } from 'react';

import './BottomBar.css'

class BottomBar extends Component {
    constructor () {
        super()
    }

    render(){
        let divStyle;

        if(this.props.index === 0){
             divStyle = {
             backgroundColor: this.props.color,
             height: "25px",
             width: "25px",
            }
        }else{
            divStyle = {
                backgroundColor: this.props.color,
                height: "15px",
                width: "15px",
               }
        }


        return(
            <div className = "scoreSquareContainera">
                <div style = {divStyle} className = "coloredSquarea"></div>
                <p>{this.props.points}p</p>
            </div>
        )}
}

export default BottomBar