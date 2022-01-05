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
  // 沒有登入時的狀態資料直接返回
  if (!userAuth) return;

  // 用這個登入帳號的uid 去當作 firestore 的doc路徑
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // 在該uid 的 firestore 的doc路徑下 調用get的方式讀取資料
  const snapShot = await userRef.get();

  // 要是資料不存在 就把該筆會員寫進firestore裏面
  if (!snapShot.exits) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      //  用set的方式寫進firestore
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
