import React, { Component } from 'react';
import './Scoreboard.css'

import TableRow from './TableRow'

class Scoreboard extends Component {


    render(){

         var rows = [];

         var c = 1;

         this.props.leaderboard.forEach((value, i) =>{ 
            rows.push(<TableRow key = {c} rank = {c} color = {value.child("color").val()} colors = {this.props.colors} score = {value.child("score").val() * -1} username = {value.child("username").val()}/>)
           
            c++
        })


        var elements = document.querySelectorAll(".teamColor")
        for(var i = 0; i<elements.length; i++){
            elements[i].setAttribute("style", `color: ${this.props.currentWinner}`)
        }
        

        var bkgElements = document.querySelectorAll(".teamColorBackground")
        for(i = 0; i<bkgElements.length; i++){
            bkgElements[i].setAttribute("style", `background-color: ${this.props.currentWinner}`)
        }

        var bkgElementsAlt = document.querySelectorAll("teamColorBackgroundAlt")
        for(i = 0; i<bkgElementsAlt.length; i++){
            let newColor = shadeColor2(colorToHex(this.props.currentWinner),  0.5);
            bkgElementsAlt[i].setAttribute("style", `background-color: ${newColor}`)
        }


        var borRightElements = document.querySelectorAll(".teamColorBorderR")
        for(i = 0; i<borRightElements.length; i++){
            borRightElements[i].setAttribute("style", `border-right: solid 1px ${this.props.currentWinner}`)
        }

        var borTopElements = document.querySelectorAll(".teamColorBorderT")
        for(i = 0; i<borTopElements.length; i++){
            borTopElements[i].setAttribute("style", `border-top: solid 1px ${this.props.currentWinner}`)
        }

        var borBotElements = document.getElementsByClassName("teamColorBorderB")
        for(i = 0; i<borBotElements.length; i++){
            borBotElements[i].setAttribute("style", `border-bottom: solid 1px ${this.props.currentWinner}`)
        }


    
        return(
            <div className = "scoreboardContainer">
                <p className = "you teamColor">You</p>
                <h1 className = "banner" style = {{backgroundColor: shadeColor2(colorToHex(this.props.currentWinner),  0.8), color: this.props.currentWinner}}>Contribution IMPLEMENT-THIS%</h1>
                <table>
                    <tbody>
                    <tr className = "teamColorBorderB" style = {{borderBottom: 'solid 1px ' + this.props.currentWinner}}>
                        <th></th><th className = "teamColor">Username</th><th className = "teamColor">Score</th><th className = "teamColor">Team</th><th className = "teamColor">Contribution</th>
                    </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        )}

}




function shadeColor2(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function colorToRGBA(color) {
    // Returns the color as an array of [r, g, b, a] -- all range from 0 - 255
    // color must be a valid canvas fillStyle. This will cover most anything
    // you'd want to use.
    // Examples:
    // colorToRGBA('red')  # [255, 0, 0, 255]
    // colorToRGBA('#f00') # [255, 0, 0, 255]
    var cvs, ctx;
    cvs = document.createElement('canvas');
    cvs.height = 1;
    cvs.width = 1;
    ctx = cvs.getContext('2d');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    return ctx.getImageData(0, 0, 1, 1).data;
}

function byteToHex(num) {
    // Turns a number (0-255) into a 2-character hex number (00-ff)
    return ('0'+num.toString(16)).slice(-2);
}

function colorToHex(color) {
    // Convert any CSS color to a hex representation
    // Examples:
    // colorToHex('red')            # '#ff0000'
    // colorToHex('rgb(255, 0, 0)') # '#ff0000'
    var rgba, hex;
    rgba = colorToRGBA(color);
    hex = [0,1,2].map(
        function(idx) { return byteToHex(rgba[idx]); }
        ).join('');
    return "#"+hex;
}

export default Scoreboard
//{this.props.leaderboard.map((cur, i) => <TableRow key = {i} color = {}/>)}