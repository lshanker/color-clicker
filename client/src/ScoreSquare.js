import React, { Component } from 'react';

import './ScoreSquare.css'

class ScoreSquare extends Component {
    
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
            if(this.props.setup){   
                divStyle = {
                    backgroundColor: this.props.color,
                    height: '60px',
                    width: '60px',
                    marginRight: '0px'
                }

            }else{
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

         
        }


        return(
            <div className = "scoreSquareContainer">
                <div style = {divStyle} name = {this.props.color} className = "coloredSquare">{this.props.setup ? <i className="fa fa-arrow-right colorArrow" aria-hidden="true"></i> : null}</div>
                {!this.props.showPoints ? null : <p>{this.props.points}p</p>}
            </div>
        )}
}

export default ScoreSquare