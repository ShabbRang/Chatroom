
import {initializeApp} from 'firebase/app'
import {
  getFirestore, collection, onSnapshot,
} from 'firebase/firestore'
import {  
  getAuth, GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDttHumnOpFugFO9SDO8xWxATcSHmBr9qQ",
    authDomain: "chatroom-c435c.firebaseapp.com",
    projectId: "chatroom-c435c",
    storageBucket: "chatroom-c435c.appspot.com",
    messagingSenderId: "249160030770",
    appId: "1:249160030770:web:53b93ada8e6bfe69037a2b",
    measurementId: "G-M221X0NFEC"
  };

    initializeApp(firebaseConfig);

  const db = getFirestore();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {auth, provider, signInWithPopup};
  export default db;


