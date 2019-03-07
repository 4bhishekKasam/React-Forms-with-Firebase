import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDwegmkXnz-bF_nP31YsKnqrxA46UYch-I",
  authDomain: "userinfoform.firebaseapp.com",
  databaseURL: "https://userinfoform.firebaseio.com",
  projectId: "userinfoform",
  storageBucket: "userinfoform.appspot.com",
  messagingSenderId: "753086437313"
};

const firebaseConfig = firebase.initializeApp(config);

export default firebaseConfig;
