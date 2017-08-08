import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import base, {auth} from './base'

import SignIn from './SignIn'
import SignOut from './SignOut'

class App extends Component {

  constructor() {
    super()


    this.state = {
      colors: { green: 0 }, //see Firebase for complete object

      uid: null
    }
  }

  componentDidMount(){

    base.syncState(
      'colors',
      {
        context: this,
        state: 'colors'
      }
    )

    //Copied from noteherder
    auth.onAuthStateChanged(
           (user) => {
                if(user){
                    //We are already signed in
                    this.authHandler(user);
                }
           }
       )
  }

    signedIn = () => {
        return this.state.uid;
    }

    signOut = () => {
        auth
            .signOut()
            .then(() => {
                this.setState({ uid: null})
            })
        
    }

  authHandler = (userData) => {
        this.setState(
                    {uid: userData.uid}
                     )
        
    }

  render(){
    return (
     <div>
         {this.signedIn() ? this.renderApp() : <SignIn/>}
     </div>
    );
  }

  renderApp() {
    return (
     <div>
        <p>Green counter: {this.state.colors.green} </p>
        <p>Yellow counter: {this.state.colors.yellow} </p>
        <p>Red counter: {this.state.colors.red} </p>
        <button onClick = {() => this.increment('green')}>Increase green counter</button>
        <button onClick = {() => this.increment('yellow')}>Increase yellow counter</button>
        <button onClick = {() => this.increment('red')}>Increase red counter</button>

        <SignOut signOut = {this.signOut}/>
      </div>
    );
  }

  increment(color){
    const count = this.state.colors[color]

    let colors = this.state.colors
    colors[color] = count + 1

    this.setState({colors})
  }

}

export default App;
