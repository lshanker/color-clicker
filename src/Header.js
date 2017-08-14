import React, { Component } from 'react';
import './Header.css';
import './App.css'

import ScoreSquare from './ScoreSquare'

class Header extends Component{
    constructor(){
        super()
    }

    render(){

        return(
       
             <div className = {`header ${this.props.currentWinner}`}> 
                 <p className = 'logOut' onClick = {this.props.signOut}>Log Out <i className="fa fa-sign-out"></i></p>
                 <div className = "squareContainer">
                 {this.props.colorScores.map((cur, i) => <ScoreSquare key = {i} index = {i} color = {cur} points = {this.props.colors[cur]}/>)}
                 </div>
             </div>
                
        )
    }
}


export default Header