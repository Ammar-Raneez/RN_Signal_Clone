import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDndr57KkTl3BhJ34DB4b1h8-FMfN51Bf4",
    authDomain: "r-native-signal.firebaseapp.com",
    projectId: "r-native-signal",
    storageBucket: "r-native-signal.appspot.com",
    messagingSenderId: "178729319911",
    appId: "1:178729319911:web:02fa61973249e795ebd142",
    measurementId: "G-RPYNZ0YX7D"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };