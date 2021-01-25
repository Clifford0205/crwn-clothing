import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCcXaBSSi4nyva-Bn0xJ1ikexzerLkLmus',
  authDomain: 'crwn-db-de3e1.firebaseapp.com',
  projectId: 'crwn-db-de3e1',
  storageBucket: 'crwn-db-de3e1.appspot.com',
  messagingSenderId: '257892462543',
  appId: '1:257892462543:web:cea6a733b16d65521becba',
  measurementId: 'G-4ZCZ4L87YY',
};

firebase.initializeApp(config);
