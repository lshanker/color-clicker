import React, { Component } from 'react';
import './Scoreboard.css'
import base, {auth} from './base'

import TableRow from './TableRow'

class Scoreboard extends Component {
    constructor () {
        super()
    }



    render(){
        this.props.leaderboard.forEach(function(data, i){
            console.log(data.child("username").val())
            console.log(data.child("color").val())
            console.log(data.child("score").val() * -1)
            console.log(data.child('contribution').val())
        })

         var rows = [];

         var c = 1;
         var topUser = "";

         this.props.leaderboard.forEach(function(value, i){ 
            rows.push(<TableRow key = {c} rank = {c} color = {value.child("color").val()} score = {value.child("score").val() * -1} username = {value.child("username").val()} contribution = {value.child('contribution').val()}/>)
            if(c===1){
                topUser = value.child("username").val()
            }

            c++
        })


        var elements = document.querySelectorAll(".teamColor")
        for(var i = 0; i<elements.length; i++){
            elements[i].setAttribute("style", `color: ${this.props.currentWinner}`)
        }
        

        var bkgElements = document.querySelectorAll(".teamColorBackground")
        for(var i = 0; i<bkgElements.length; i++){
            bkgElements[i].setAttribute("style", `background-color: ${this.props.currentWinner}`)
        }

        var bkgElementsAlt = document.querySelectorAll("teamColorBackgroundAlt")
        for(var i = 0; i<bkgElementsAlt.length; i++){
            console.log('heresadfasfsdaf')
            let newColor = shadeColor2(colorToHex(this.props.currentWinner),  0.5);
            bkgElementsAlt[i].setAttribute("style", `background-color: ${newColor}`)
        }

        console.log(this.props.currentWinner)
        console.log(colorToHex(this.props.currentWinner))
        console.log(shadeColor2(colorToHex(this.props.currentWinner),  0.5))

        var borRightElements = document.querySelectorAll(".teamColorBorderR")
        for(var i = 0; i<borRightElements.length; i++){
            borRightElements[i].setAttribute("style", `border-right: solid 1px ${this.props.currentWinner}`)
        }

        var borTopElements = document.querySelectorAll(".teamColorBorderT")
        for(var i = 0; i<borTopElements.length; i++){
            borTopElements[i].setAttribute("style", `border-top: solid 1px ${this.props.currentWinner}`)
        }

        var borBotElements = document.getElementsByClassName("teamColorBorderB")
        for(var i = 0; i<borBotElements.length; i++){
            console.log('asfasdfasdf')
            borBotElements[i].setAttribute("style", `border-bottom: solid 1px ${this.props.currentWinner}`)
        }


    
        return(
            <div className = "scoreboardContainer">
                <p className = "you teamColor">You</p>
                <h1 className = "banner" style = {{backgroundColor: shadeColor2(colorToHex(this.props.currentWinner),  0.8), color: this.props.currentWinner}}>Contribution {(this.props.leaderboardInfo.contribution * 100).toFixed(2)}%</h1>
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


function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
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