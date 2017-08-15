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
     console.log(snapshot.val());
     if(Date.now()>=snapshot.val()){
         console.log('time is up!')
         ref.set(Date.now() + 3600000)
     }
    });
}, 1000)