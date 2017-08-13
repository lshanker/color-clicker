import React, { Component } from 'react';
import './Scoreboard.css'

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
        })

         var rows = [];
         var i = 0;

         this.props.leaderboard.forEach(function(value, i){ 
            rows.push(<TableRow key = {i} rank = {i} color = {value.child("color").val()} score = {value.child("score").val() * -1} username = {value.child("username").val()}/>)
         })

        return(
            <div className = "scoreboardContainer">
                <h1 className = "leader">Current Leader: (username)</h1>
                <table>
                    
                    <tbody>
                    <tr>
                        <th>Rank</th><th>Username</th><th>Score</th>
                    </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        )}
}

export default Scoreboard
//{this.props.leaderboard.map((cur, i) => <TableRow key = {i} color = {}/>)}