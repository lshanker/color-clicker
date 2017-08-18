import React, { Component } from 'react';
import './App.css'
import './Nav.css'
import './Shop.css'

import ShopItem from './ShopItem'

class Shop extends Component {



    render(){

        var inShop = []
        var c = 0;
        
        var descriptions = ['point once a  minute.', 'points once an  hour.', 'points once a  day.', 'once every 12 hours.', 'once a day.', 'once every 36 hours.']
        var prices = [200, 2000, 4000, 10000, 20000, 40000]

        Object.keys(this.props.items).forEach((cur) => {
            if(cur.substring(0, 3) === 'add'){
              inShop.push(<ShopItem purchaseItem = {this.props.purchaseItem} key = {c} type = "add" price = {prices[c]} value = {parseInt(cur.substring(3), 10)} teamColor = {this.props.teamColor} description = {descriptions[c]}/>)
            }else{
                inShop.push(<ShopItem purchaseItem = {this.props.purchaseItem} key = {c} type = "mul" price = {prices[c]} value = {parseInt(cur.substring(3), 10)} teamColor = {this.props.teamColor} description = {descriptions[c]}/>)
            }
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