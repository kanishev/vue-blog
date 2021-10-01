import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKaTNgEEKLQ5okjLWS7b46tfJQ53g64MM",
  authDomain: "vue-blog-79178.firebaseapp.com",
  databaseURL: "https://vue-blog-79178-default-rtdb.firebaseio.com",
  projectId: "vue-blog-79178",
  storageBucket: "vue-blog-79178.appspot.com",
  messagingSenderId: "138956887530",
  appId: "1:138956887530:web:2f5abb9ce89a70e7208e93",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
