const firebase = require("firebase/app");
require("firebase/database");

const apis = {
apiKey: "AIzaSyBTWMUv5dPFMFP-OfDg_BU30vstfoaMRBA",
    authDomain: "twitter-final-1cc92.firebaseapp.com",
    databaseURL: "https://twitter-final-1cc92.firebaseio.com",
    projectId: "twitter-final-1cc92",
    storageBucket: "twitter-final-1cc92.appspot.com",
    messagingSenderId: "564231665653",
    appId: "1:564231665653:web:598ea9ca8bdfe236"
};

firebase.initializeApp(apis);

const push = value => {
  firebase
    .database()
    .ref("/database")
    .push(value);
};

module.exports = {
  push
};
