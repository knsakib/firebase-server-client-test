const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

var message = [];
db.collection('events').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      message.push(doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

const app = express();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.set('view engine', 'ejs');

app.get('/', (request, response) =>{
    response.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    
    response.render('index', {message});
    
});


exports.app = functions.https.onRequest(app);
