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

var interval = setInterval(() => {
    ref.once("value", function(snapshot) {
     if(Date.now()>=snapshot.val()){
         console.log('time is up!')
         ref.set(Date.now() + 20000)

         var winnerRef = db.ref('previousWinner');
         var colorRef = db.ref('colors')
         var numRef = db.ref('contestNumber')


        numRef.transaction(function(current_value) {
            return(current_value + 1)
        });
       
       

         colorRef.on('value', function(snapshot){
            var colors = snapshot.val()
            var winner = "";
            var winnerTotal = 0;
            Object.keys(colors).forEach((cur) => {
                if(colors[cur] > winnerTotal){
                    winner = cur;
                    winnerTotal = colors[cur];
                }
            });
            winnerRef.set(winner);
         })

        colorRef.set({gold: 0, green: 0, orange: 0, purple: 0, red: 0})
    
     }
    });
}, 1000)