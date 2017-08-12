import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className = 'nav'>
                <div className = 'menuOption' onClick={() => this.props.history.push('/shop')} ><p  className = 'menuOptionText'>Shop</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/scoreboard')}><p className = 'menuOptionText'>Scoreboard</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/loan')}><p className = 'menuOptionText' >Loan</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/profile')}><p className = 'menuOptionText'>Profile</p></div>
            </div>
        )
    }
}


export default Nav