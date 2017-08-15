import React, { Component } from 'react';
import './Header.css';
import './App.css'

import ScoreSquare from './ScoreSquare'

class Header extends Component{
    constructor(){
        super()
    }

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
       
             <div className = "header teamColorBackground"> 
                 <p className = 'logOut' onClick = {this.props.signOut}>Log Out <i className="fa fa-sign-out"></i></p>
                 <div className = "squareContainer teamColorBorderT">
                 {this.props.colorScores.map((cur, i) => <ScoreSquare key = {i} index = {i} color = {cur} points = {this.props.colors[cur]} showPoints = {true}/>)}
                 </div>
             </div>
                
        )
    }
}


export default Header