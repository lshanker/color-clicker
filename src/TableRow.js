import React, { Component } from 'react';
import './TableRow.css'

class TableRow extends Component{
    render(){
        return(
            <tr>
              <td>{this.props.rank}</td><td>{this.props.username}</td><td>{this.props.score}</td>
            </tr>
        )
    }
}

export default TableRow