import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className = 'nav'>
                <div className = "title"><p>Color Clicker</p><img src={require('./images/mouse-hand.png')} /></div>
                <div className = "border"></div>
                <div className = "menuOption" onClick={() => this.props.history.push('/home')}><p className = "menuOptionText"><i className = "fa fa-home"></i>Home</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/shop')} ><p  className = 'menuOptionText'><i className="fa fa-money"></i>Shop</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/scoreboard')}><p className = 'menuOptionText'><i className="fa fa-bar-chart" aria-hidden="true"></i>Scoreboard</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/loan')}><p className = 'menuOptionText' ><i className="fa fa-university" aria-hidden="true"></i>Loan</p></div>
                <div className = 'menuOption' onClick={() => this.props.history.push('/profile')}><p className = 'menuOptionText'><i className="fa fa-user" aria-hidden="true"></i>Profile</p></div>
            </div>
        )
    }
}


export default Nav