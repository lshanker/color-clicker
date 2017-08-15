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
        for(var i = 0; i<bkgElements.length; i++){
            bkgElements[i].setAttribute("style", `background-color: ${this.props.currentWinner}`)
        }

        var borRightElements = document.querySelectorAll(".teamColorBorderR")
        for(var i = 0; i<borRightElements.length; i++){
            borRightElements[i].setAttribute("style", `border-right: solid 1px ${this.props.currentWinner}`)
        }

        var borTopElements = document.querySelectorAll(".teamColorBorderT")
        for(var i = 0; i<borTopElements.length; i++){
            borTopElements[i].setAttribute("style", `border-top: solid 1px ${this.props.currentWinner}`)
        }


        return(
            <tr>
              <td className = "teamColorBorderR">#{this.props.rank}</td><td className = "teamColorBorderR">{this.props.username}</td><td className = "teamColorBorderR">{this.props.score}</td><td className = "teamColorBorderR"><ScoreSquare color = "green" showPoints = {null}/></td><td>??.??</td>
            </tr>
        )
    }
}

export default TableRow