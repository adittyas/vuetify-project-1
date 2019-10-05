import * as firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCMX2RkaVZW07_JV3Tk44CM2j_2MDhmCbo",
    authDomain: "ninja-c6641.firebaseapp.com",
    databaseURL: "https://ninja-c6641.firebaseio.com",
    projectId: "ninja-c6641",
    storageBucket: "ninja-c6641.appspot.com",
    messagingSenderId: "907180194685",
    appId: "1:907180194685:web:24639bc3f3dd4df3812a14",
    measurementId: "G-GT4CYLDSDF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

db.settings({
    timestampsInSnapshots: true
});

export default db;