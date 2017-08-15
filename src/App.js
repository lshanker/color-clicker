import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/database'
import base, {auth} from './base'

import { Route, Switch, Redirect } from 'react-router-dom'

import SignIn from './SignIn'
import SignOut from './SignOut'
import Header from './Header'
import Nav from './Nav'
import ButtonPage from './ButtonPage'
import Shop from './Shop'
import Scoreboard from './Scoreboard'
import Loan from './Loan'
import Profile from './Profile'
import Splash from './Splash'

class App extends Component {


  constructor() {
    super()


    this.state = {
      colors: { green: 0 }, //see Firebase for complete object

      colorScores: [],

      uid: null,

      possessions: {username: "lshanker", points: 0, color: 'green', given: 0},

      leaderboardInfo: {username: "lshanker", score: 0, color: "green"},
      leaderboard: {},

      currentWinner: "green",
  

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

    var colorRef = firebase.database().ref('colors/');
    colorRef.orderByValue().on('value', (data) => {
       
      var colorScores = [];      
      data.forEach(function(data) {
        colorScores.push(data.key)
      });
      colorScores = colorScores.reverse();
      let currentWinner = colorScores[0]
      this.setState({colorScores})
      this.setState({currentWinner})
    })    


    var scoreRef = firebase.database().ref('leaderboard/');
    scoreRef.orderByChild("score").limitToFirst(100).on('value', (data) =>{
      this.setState({leaderboard: data})
    })

   

   
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
      console.log('here')
        auth
            .signOut()
            .then(() => {
                base.removeBinding(this.ref)
                this.setState({ uid: null, possessions: {points: 0, color: 'green'}})
            })
            this.props.history.push('/')
    }

  authHandler = (userData) => {
        this.setState(
                    {uid: userData.uid},
                      this.syncUserPossessions,
                      this.syncWinner
                     )
        
  }

  syncWinner = () => {

    
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

         base.update(`leaderboard/${this.state.uid}`, {
           data: this.state.leaderboardInfo
         });

        
      }else{
        base.fetch(`users/${this.state.uid}`, {
          context: this,
          asArray: false,
          then(data){
            this.setState({possessions: data})
          }
        });
      }

      this.ref = base.syncState(
      `users/${this.state.uid}`,
      {
        context: this,
        state: 'possessions'
      }
    )

    this.setState({leaderboardInfo: {username: this.state.possessions.username, score: this.state.possessions.given, color: this.state.possessions.color}})

    base.syncState(
      `leaderboard/${this.state.uid}`,
      {
        context: this,
        state: 'leaderboardInfo'
      }
    )

    }).catch(error => {

    })

  
  }


  render(){
    return (
     <div>

        <Switch>
          <Route path="/home" render={() => (
            this.signedIn()
              ?<div><Header colorScores = {this.state.colorScores} colors = {this.state.colors} signOut = {this.signOut} history={this.props.history} currentWinner={this.state.currentWinner}/>
              <ButtonPage 
              possessions = {this.state.possessions} incrementPoints = {this.incrementPoints} 
              colors = {this.state.colors} incrementTeam = {this.incrementTeam}/> 
               <Nav history={this.props.history} currentWinner={this.state.currentWinner} uid = {this.state.uid}/> 
              </div>
              : <Redirect to="/sign-in"/>
          )} />
          <Route path="/sign-in" render={() => (
            !this.signedIn()
              ?<SignIn />
              :<Redirect to="/home" />
            )} />
        <Route path="/shop" render={() => (
            this.signedIn()
              ?<div><Header colorScores = {this.state.colorScores} colors = {this.state.colors} signOut = {this.signOut} history={this.props.history} currentWinner={this.state.currentWinner}/>
              <Shop />
              <Nav history={this.props.history} currentWinner={this.state.currentWinner} /></div>
              : <Redirect to="/sign-in"/>
          )} />

          <Route path="/scoreboard" render={() => (
            this.signedIn()
              ?<div><Header colorScores = {this.state.colorScores} colors = {this.state.colors} signOut = {this.signOut} history={this.props.history} currentWinner={this.state.currentWinner}/>
              <Scoreboard leaderboard = {this.state.leaderboard}/>
              <Nav history={this.props.history} currentWinner={this.state.currentWinner} />
              </div>
              : <Redirect to="/sign-in"/>
          )} />

          <Route path="/loan" render={() => (
            this.signedIn()
              ?<div><Header colorScores = {this.state.colorScores} colors = {this.state.colors} signOut = {this.signOut} history={this.props.history} currentWinner={this.state.currentWinner}/>
              <Loan />
              <Nav history={this.props.history} currentWinner={this.state.currentWinner} /></div>
              : <Redirect to="/sign-in"/>
          )} />

          <Route path="/profile" render={() => (
            this.signedIn()
              ?<div><Header colorScores = {this.state.colorScores} colors = {this.state.colors} signOut = {this.signOut} history={this.props.history} currentWinner={this.state.currentWinner}/>
              <Profile />
              <Nav history={this.props.history} currentWinner={this.state.currentWinner} /></div>
              : <Redirect to="/sign-in"/>
          )} />

          <Route path="/" render={() => (
            <Splash colorScores = {this.state.colorScores} colors = {this.state.colors} history={this.props.history} currentWinner={this.state.currentWinner}/>
          )} />

          <Route render={() => <Redirect to="/" />} />
        </Switch>
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

  incrementTeam = (color, points) => {

    const count = this.state.colors[color]

    let colors = this.state.colors
    colors[color] = count + points

    let possessions = this.state.possessions
    possessions.points = 0
    possessions.given+=points
    this.setState({colors, possessions})

    let leaderboardInfo = this.state.leaderboardInfo
    leaderboardInfo.score-=points
    this.setState({leaderboardInfo})
  }


}

export default App;