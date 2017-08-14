import React, { Component } from 'react';
import './Splash.css'

class Splash extends Component {
    constructor (){
        super()
    }

    render(){
        return (
            <div className="a">
                <div className="title medium medium-offset-40 columns" onClick={() => this.props.history.push('/home')}><p>Color Clicker. Click to enter</p></div>
            </div>
        )
    }
}

export default Splash