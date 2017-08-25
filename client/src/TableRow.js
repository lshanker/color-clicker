import React, { Component } from 'react';
import './TableRow.css'

import ScoreSquare from './ScoreSquare'

class TableRow extends Component{
    render(){
        var elements = document.querySelectorAll(".teamColor")
        for(var i = 0; i<elements.length; i++){
            elements[i].setAttribute("style", `color: ${this.props.currentWinner}`)
        }
        

        var bkgElements = document.querySelectorAll(".teamColorBackground")
        for(i = 0; i<bkgElements.length; i++){
            bkgElements[i].setAttribute("style", `background-color: ${this.props.currentWinner}`)
        }

        var borRightElements = document.querySelectorAll(".teamColorBorderR")
        for(i = 0; i<borRightElements.length; i++){
            borRightElements[i].setAttribute("style", `border-right: solid 1px ${this.props.currentWinner}`)
        }

        var borTopElements = document.querySelectorAll(".teamColorBorderT")
        for(i = 0; i<borTopElements.length; i++){
            borTopElements[i].setAttribute("style", `border-top: solid 1px ${this.props.currentWinner}`)
        }


        return(
            <tr>
              <td className = "teamColorBorderR">#{this.props.rank}</td><td className = "teamColorBorderR">{this.props.username}</td><td className = "teamColorBorderR">{this.props.score}</td><td className = "teamColorBorderR"><ScoreSquare color = {this.props.color} showPoints = {null}/></td><td>{this.props.score === 0 ? 0 : ((this.props.score/this.props.colors[this.props.color])*100).toFixed(2)}%</td>
            </tr>
        )
    }
}

export default TableRow