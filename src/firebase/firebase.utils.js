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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  console.log(snapShot);
  if (!snapShot.exits) {
  }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
