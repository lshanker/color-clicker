import React, { Component } from 'react';

import './ScoreSquare.css'

class ScoreSquare extends Component {
    constructor () {
        super()
    }

    render(){
        let divStyle;

        if(this.props.splash){
            if(this.props.index === 0){
                divStyle = {
                backgroundColor: this.props.color,
                height: "100px",
                width: "100px",
                }
            }else{
                    divStyle = {
                    backgroundColor: this.props.color,
                    height: "80px",
                    width: "80px",
                    }
            }
        }
        else{

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
        }


        return(
            <div className = "scoreSquareContainer">
                <div style = {divStyle} className = "coloredSquare"></div>
                {!this.props.showPoints ? null : <p>{this.props.points}p</p>}
            </div>
        )}
}

export default ScoreSquare