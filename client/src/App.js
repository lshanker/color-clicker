import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase/app'
import 'firebase/database'
import base, {auth} from './base'

import { Route, Switch, Redirect } from 'react-router-dom'

import SignIn from './SignIn'
import Header from './Header'
import Nav from './Nav'
import ButtonPage from './ButtonPage'
import Shop from './Shop'
import Scoreboard from './Scoreboard'
import Loan from './Loan'
import Profile from './Profile'
import Splash from './Splash'
import FirstTimeSetup from './FirstTimeSetup'
import Popup from './Popup'

class App extends Component {


  constructor() {
    super()


    this.state = {
      colors: { green: 0 }, //see Firebase for complete object

      colorScores: [],

      uid: null,

      possessions: {username: "", points: 0, color: 'gray', given: 0, curContest: 0},

      activeContest: 0,

      leaderboardInfo: {username: "", score: 0, color: "gray"},
      leaderboard: {},

      currentWinner: "gray",
  
      items: {
          add1: {owned: 0, cooldown: 60000, startTime: 0},
          add100: {owned: 0, cooldown: 3600000, startTime: 0},
          add3000: {owned: 0, cooldown: 86400000, startTime: 0},
          mul1: {owned: 0, cooldown: 43200000, startTime: 0},
          mul2: {owned: 0, cooldown: 86400000, startTime: 0},
          mul3: {owned: 0, cooldown: 129600000, startTime: 0},
      },

      newPoints: 0,
      
      previousWinner: ''

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

         var ref = firebase.database().ref(`users/${this.state.uid}/items`);
         ref.set(this.state.items)

        
  
        
      }else{
        base.fetch(`users/${this.state.uid}`, {
          context: this,
          asArray: false,
          then(data){
            this.setState({possessions: data})
          }
        });
      }

      base.syncState(
        `users/${this.state.uid}/items`,
        {
          context: this,
          state: 'items'
        })

      this.ref = base.syncState(
      `users/${this.state.uid}`,
      {
        context: this,
        state: 'possessions'
      }
    )

    base.fetch(`activeContest`, {
      context: this,
    }).then(data => {

      this.setState({activeContest: data})

      if(data>this.state.possessions.curContest){

        var possessions = this.state.possessions;
        possessions.points = 0;
        possessions.given = 0;

        var leaderboardInfo = this.state.leaderboardInfo;
        leaderboardInfo.score = 0;

        var items = this.state.items;
        Object.keys(items).forEach((item) => {
          items[item].owned = 0;
        });

        this.setState({possessions})
        this.setState({leaderboardInfo}) 
        this.setState({items})
      }

    }); 

    base.fetch('previousWinner', {
      context: this,
    }).then(data => {
      var possessions = this.state.possessions;
      possessions.previousWinner = data;
      this.setState({possessions})
    });


    base.syncState('previousWinner', {
      context: this,
      state: 'previousWinner'
    })


  
    base.fetch(`users/${this.state.uid}/leaderboardInfo`, {
      context: this,
    }).then(data => {

      this.setState({leaderboardInfo: data})
    });

    if(this.state.possessions.color !== 'gray'){

    

    base.syncState(
      `leaderboard/${this.state.uid}`,
      {
        context: this,
        state: 'leaderboardInfo'
      }
    )

    base.syncState(
      'activeContest',
      {
        context: this,
        state: 'activeContest'
      }
    )

    }



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
              colors = {this.state.colors} incrementTeam = {this.incrementTeam} newPoints = {this.state.newPoints} checkItems = {this.checkItems} items = {this.state.items}/> 
               <Nav history={this.props.history} currentWinner={this.state.currentWinner} uid = {this.state.uid}/> 
              {this.state.possessions.color === 'gray' ? <FirstTimeSetup colors = {this.state.colors} setup = {this.setup}/> : null}
              {(this.state.newPoints > 0) ? <Popup clickHandler = {this.resetNewpoints} buttonText = 'Nice!' title = "Points Earned" message = {`While you were away you earned ${this.state.newPoints} points!`}/> : null}
              {((this.state.possessions.curContest < this.state.activeContest) && this.state.possessions.username !== '') ? <Popup clickHandler = {this.updateContest} buttonText = 'OK' title = "Contest has ended" message = {`While you were away last week's contest ended. The winning team was ${this.state.previousWinner}.`}/>:null}
              </div>
              : <Redirect to="/sign-in"/>
          )} />
          <Route path="/sign-in" render={() => (
            !this.signedIn()
              ?<SignIn color = {this.state.currentWinner}/>
              :<Redirect to="/home" />
            )} />
        <Route path="/shop" render={() => (
          this.signedIn()
          ?<div><Header colorScores = {this.state.colorScores} colors = {this.state.colors} signOut = {this.signOut} history={this.props.history} currentWinner={this.state.currentWinner}/>
            <Shop purchaseItem = {this.purchaseItem} teamColor = {this.state.possessions.color} items = {this.state.items}/>
           <Nav history={this.props.history} currentWinner={this.state.currentWinner} uid = {this.state.uid}/> 
          </div>
          : <Redirect to="/sign-in"/>
          )} />

          <Route path="/scoreboard" render={() => (
            this.signedIn()
              ?<div><Header colorScores = {this.state.colorScores} colors = {this.state.colors} signOut = {this.signOut} history={this.props.history} currentWinner={this.state.currentWinner}/>
              <Scoreboard leaderboard = {this.state.leaderboard} currentWinner = {this.state.currentWinner} leaderboardInfo = {this.state.leaderboardInfo} colors = {this.state.colors}/>
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

    base.update(`users/${this.state.uid}/leaderboardInfo`, {
      data: leaderboardInfo
    });

   base.update(`leaderboard/${this.state.uid}`,{
      data: leaderboardInfo
   }); 
  }

  checkItems = () =>{
    let items = this.state.items;
    var newPoints = 0;
    Object.keys(items).forEach((item) => {

      if(items[item].startTime + items[item].cooldown <= Date.now()){
        var possessions = this.state.possessions;
        if(item.indexOf('add') !== -1){
          var toBeAdded = item.substring(3);
          var num = parseInt(toBeAdded, 10)

          var intervals = Math.floor((Date.now()-items[item].startTime)/items[item].cooldown) //Needed for when the user leaves the website and comes back later

          if(intervals > 1){
            newPoints += num * items[item].owned * intervals;
          }

          possessions.points+=(num * items[item].owned * intervals)
          this.setState({possessions})
          
          items[item].startTime = Date.now()
          this.setState({items})
        }

        if(item.indexOf('mul') !== -1 && items[item].owned !== 0){
          var multiplier = '1.' + item.substring(3);
            

          var numM = parseFloat(multiplier)


          var intervalsM = Math.floor((Date.now()-items[item].startTime)/items[item].cooldown) //Needed for when the user leaves the website and comes back later

          if(intervalsM > 1){
            newPoints += possessions.points * numM * items[item].owned * intervalsM;
          }


          possessions.points*= (numM * items[item].owned * intervalsM)


          possessions.points = Math.ceil(possessions.points)


          this.setState({possessions})
          
          items[item].startTime = Date.now()
          this.setState({items})
        }

      }
    })
  
    if(newPoints>0){
      this.setState({newPoints: Math.ceil(newPoints)})
      this.forceUpdate();
    }

    }

    resetNewpoints = () => {
      this.setState({newPoints: 0})
    }

    purchaseItem = (price, value, type) => {
      if(this.state.possessions.points < price){
        alert("You need more points to buy that!");
      }else{
        let possessions = this.state.possessions
        possessions.points-=price

        let items = this.state.items
        items[type + value].owned++
        items[type + value].startTime = Date.now()

        this.setState({possessions})
        this.setState({items})
      }
    }

    setup = (username, color) => {

      let possessions = this.state.possessions;
      possessions.username = username;
      possessions.color = color;

      this.setState({possessions})


      //Do leaderboard stuff
      var leaderboardInfo = this.state.leaderboardInfo;
      leaderboardInfo.color = color;
      leaderboardInfo.username = username;
      leaderboardInfo.score = this.state.possessions.given;
      this.setState({leaderboardInfo})


      base.update(`users/${this.state.uid}/leaderboardInfo`, {
        data: this.state.leaderboardInfo
      });

      base.update(`leaderboard/${this.state.uid}`,{
        data: this.state.leaderboardInfo

      });

       base.syncState(
            `leaderboard/${this.state.uid}`,
            {
              context: this,
              state: 'leaderboardInfo'
            }
          )

          this.updateContest()
    }

    updateContest = () => {
      var possessions = this.state.possessions;
      possessions.curContest = this.state.activeContest;
      this.setState({possessions})
    }




}

export default App;