import React, { Component } from 'react';

import './Timer.css'

class Timer extends Component{
    countDown = (deadline, duration) => {
       
    }

    render(){

        var minutes = 0;
        var seconds = 0;
        var days = 0;
        var hours = 0;

        
        let distance = this.props.deadline - Date.now()
            
        days = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
         console.log(minutes + " " + seconds)

        return(
            <p>d: {days} h: {hours} m: {minutes} s: {seconds} </p>
        )
    }
}

export default Timer