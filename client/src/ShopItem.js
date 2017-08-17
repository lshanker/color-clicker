import React, { Component } from 'react';

import './ShopItem.css'

class ShopItem extends Component {
    render(){
        if(this.props.type ==='add'){
        return(
            <div className = "shopItem">
                <div className = "adder" style = {{backgroundColor: this.props.teamColor}}>
                    {this.props.value}                     
                </div>
                <p className = "description">Generates {this.props.value} {this.props.description}</p>
                <p className = 'price'>{this.props.price}p</p>
                <button onClick = {() => {this.props.purchaseItem(this.props.price, this.props.value, this.props.type)}}className = "buy" style = {{backgroundColor: this.props.teamColor}}><i className="fa fa-credit-card" aria-hidden="true"></i>Buy</button>
            </div>
        )
    }else{
        return(
            <div className = "shopItem">
            <div className = "adder" style = {{backgroundColor: this.props.teamColor}}>
                X 1.{this.props.value}                     
            </div>
            <p className = "description">Multiplies points by 1.{this.props.value} {this.props.description}</p>
            <p className = 'price'>{this.props.price}p</p>
            <button onClick = {() => {this.props.purchaseItem(this.props.price, this.props.value, this.props.type)}}className = "buy" style = {{backgroundColor: this.props.teamColor}}><i className="fa fa-credit-card" aria-hidden="true"></i>Buy</button>
        </div>
        )
    }
    }
}

export default ShopItem