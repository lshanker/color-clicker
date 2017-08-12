import React, { Component } from 'react';
import './Header.css';

class Header extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className = 'header'>
                <p className = 'title' onClick={() => this.props.history.push('/home')}>Color Clicker</p>
                <button className = 'logOut' onClick = {this.props.signOut}>Log Out <i className="fa fa-sign-out"></i></button>
            </div>
        )
    }
}


export default Header