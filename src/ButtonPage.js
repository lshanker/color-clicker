import React, { Component } from 'react';
import './ButtonPage.css';

class ButtonPage extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div className = 'buttonPage'>
                <button className = "bigButton"><p>Click Here!</p></button>
                <p className = "pointCount">Points: 50</p>
            </div>
        )
    }
}


export default ButtonPage