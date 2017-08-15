import React, { Component } from 'react';
import './TableRow.css'

import ScoreSquare from './ScoreSquare'

class TableRow extends Component{
    render(){
        return(
            <tr>
              <td>#{this.props.rank}</td><td>{this.props.username}</td><td>{this.props.score}</td><td><ScoreSquare color = "green" showPoints = {null}/></td><td>??.??%</td>
            </tr>
        )
    }
}

export default TableRow