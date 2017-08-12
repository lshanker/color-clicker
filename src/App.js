import React, { Component } from 'react';
import './App.css';
import base, {auth} from './base'

import SignIn from './SignIn'
import SignOut from './SignOut'
import Header from './Header'
import Nav from './Nav'
import ButtonPage from './ButtonPage'

class App extends Component {

  constructor() {
    super()


    this.state = {
      colors: { green: 0 }, //see Firebase for complete object

      uid: null,

      possessions: {points: 0, color: 'green'}
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
   
  }

  componentWillMount(){
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
                    {uid: userData.uid},
                      this.syncUserPossessions
                     )
        
  }

  syncUserPossessions = () => {
   


     base.fetch(`users/${this.state.uid}`, {
      context: this,
    }).then(data => {


      //Checks if data is an empty object (no user data found)
      if(Object.keys(data).length === 0 && data.constructor === Object){
        base.update(`users/${this.state.uid}`, {
          data: this.state.possessions
         }
         );
      }

      base.syncState(
      `users/${this.state.uid}`,
      {
        context: this,
        state: 'possessions'
      }
    )

    }).catch(error => {

    })

  
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
        <Header signOut = {this.signOut}/>
        <ButtonPage possessions = {this.state.possessions} incrementPoints = {this.incrementPoints}/>
        <Nav/>
      
      </div>
    );
  }



  changeState(){
    let possessions = this.state.possessions
    possessions.points = 5
    this.setState({possessions})
  }

  incrementPoints = () => {
    let possessions = this.state.possessions
    ++possessions.points
    this.setState({possessions})
  }

  incrementTeam(color){
    const count = this.state.colors[color]

    let colors = this.state.colors
    colors[color] = count + 1

    this.setState({colors})
  }

}

export default App;