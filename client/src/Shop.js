import React, { Component } from 'react';
import './App.css'
import './Nav.css'
import './Shop.css'

import ShopItem from './ShopItem'

class Shop extends Component {
    constructor () {
        super()
    }



    render(){

        var inShop = []
        var c = 0;
        
        var descriptions = ['point every minute.', 'points every hour.', 'points every day.']
        var prices = [200, 2000, 4000]

        Object.keys(this.props.items).forEach((cur) => {
            inShop.push(<ShopItem purchaseItem = {this.props.purchaseItem} key = {c} type = "add" price = {prices[c]} value = {parseInt(cur.substring(3))} teamColor = {this.props.teamColor} description = {descriptions[c]}/>)
            c++;
        })


        return(
            <div className = "shopContainer">
                <fieldset className = "expireContainer" style = {{borderTop: `1px solid ${this.props.teamColor}`}}>
                    <legend style = {{color: this.props.teamColor}}>Will Expire When Timer Ends</legend>
                    {inShop}
                </fieldset>
                <fieldset className = "expireContainer" style = {{borderTop: `1px solid ${this.props.teamColor}`}}>
                    <legend style = {{color: this.props.teamColor}}>Never Expire</legend>
                </fieldset>
                
                
            </div>
        )}
}

export default Shop