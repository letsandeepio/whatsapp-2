import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCEHzrKGg2ZlHA8b7dgluEOfzzymTg223Q',
  authDomain: 'whatsapp2-22709.firebaseapp.com',
  projectId: 'whatsapp2-22709',
  storageBucket: 'whatsapp2-22709.appspot.com',
  messagingSenderId: '210904271102',
  appId: '1:210904271102:web:17855398a404d87e233daf'
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
