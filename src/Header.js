import React, { Component } from 'react';
import './Header.css';
import './App.css'

class Header extends Component{
    constructor(){
        super()
    }

    render(){
        return(
       
             <div className = {`header ${this.props.currentWinner}`}>   
                 <p className = 'logOut' onClick = {this.props.signOut}>Log Out <i className="fa fa-sign-out"></i></p>
             </div>
                
        )
    }
}


export default Header