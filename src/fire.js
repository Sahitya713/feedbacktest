import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA2UriX04CLwLxYfn7qp6ji_FHQ0-E8HSY",
  authDomain: "b1g1-feedback.firebaseapp.com",
  databaseURL: "https://b1g1-feedback.firebaseio.com",
  projectId: "b1g1-feedback",
  storageBucket: "b1g1-feedback.appspot.com",
  messagingSenderId: "1069934037791",
  appId: "1:1069934037791:web:ea633f8aa496aeb250fe2a"
};
// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

//   export default fireDB.database().ref();
export default fireDB
// export default firebaseConfig
