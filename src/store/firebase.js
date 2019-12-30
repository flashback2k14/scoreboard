import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCJKU3Ui3Qoc2hCrZEhdmt1mybU6E8k2ys',
  authDomain: 'yeah-scoreboard.firebaseapp.com',
  databaseURL: 'https://yeah-scoreboard.firebaseio.com',
  projectId: 'yeah-scoreboard',
  storageBucket: 'yeah-scoreboard.appspot.com',
  messagingSenderId: '12720348523',
  appId: '1:12720348523:web:f1c25645033cac6f76402e'
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export const auth = firebase.auth();
export const eventsCollection = db.collection('events');
export const eventDataCollection = db.collection('eventData');
export const participantsCollection = db.collection('participants');
export const scoresCollection = db.collection('scores');
