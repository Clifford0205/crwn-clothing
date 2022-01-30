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
  // const collectionRef = firestore.collection('users');

  // 就算路徑下沒有東西 firebase一樣會返回一個snapShot物件 要用get去驗證存不存在(exists)
  // 在該uid 的 firestore 的doc路徑下 調用get的方式讀取資料
  const snapShot = await userRef.get();
  // const collectionSnapshot = await collectionRef.get();
  // console.log({
  //   collectionSnapshot: collectionSnapshot.docs.map(doc => doc.data()),
  // });

  // 要是資料不存在 就把該筆會員寫進firestore裏面
  if (!snapShot.exists) {
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

// 用來一次性寫入資料 把shopData寫進firebase裏面
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  // 防止過程中有誤,資料全部成功 或全部不成功
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    // 如果沒有指定文件 doc 的名稱，執行後會自動產生一個亂數代碼作為文件名稱。
    // https://www.oxxostudio.tw/articles/201905/firebase-firestore.html
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
