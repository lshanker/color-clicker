import React, { Component } from 'react';
import './Popup.css';

class Popup extends Component {
    render(){
        return(
        <div className = "popupContainer">
            <div className = "overlay">
            </div>
            <div className = 'popupBox2'>
                <h1>{this.props.title}</h1>
                <p className = "message">{this.props.message}</p>
                <button className = "confirm" onClick = {this.props.clickHandler}>{this.props.buttonText}</button>
            </div>
        </div>
        )
    }
}

export default Popup