var admin = require("firebase-admin");
var http = require('http')

// Fetch the service account key JSON file contents
var serviceAccount = require("./color-clicker-b234a-firebase-adminsdk-ka48o-41f5d06651.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://color-clicker-b234a.firebaseio.com"
});


// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("deadline");
var winnerRef = db.ref('previousWinner');
var numRef = db.ref('activeContest')


var interval = setInterval(() => {
    ref.once("value", function(snapshot) {
     if(Date.now()>=snapshot.val()){
         console.log('time is up!')
         ref.set(Date.now() + 10000)

         

        numRef.transaction(function(current_value) {
            return(current_value + 1)
        });
       
       
        var colorRef = db.ref('colors')
         colorRef.once('value', function(snapshot){
            var colors = snapshot.val()
            
            console.log(colors)
            console.log('in here')

            var winner = "";
            var winnerTotal = 0;
            Object.keys(colors).forEach((cur) => {
                console.log(cur + " " + colors[cur])
                if(colors[cur] > winnerTotal){
                    winner = cur;
                    winnerTotal = colors[cur];
                }
            });
        
            console.log('winner: ' + winner)
            winnerRef.set(winner);

            colorRef.set({gold: 0, green: 0, orange: 0, purple: 0, red: 0})
         })

        
    
     }
    });
}, 1000)