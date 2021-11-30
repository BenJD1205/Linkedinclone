import firebase from 'firebase';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAvLQu5bygAH8J7EgugDTUkgzcR17buWsk",
    authDomain: "linkedin-clone-b4fca.firebaseapp.com",
    projectId: "linkedin-clone-b4fca",
    storageBucket: "linkedin-clone-b4fca.appspot.com",
    messagingSenderId: "441184958845",
    appId: "1:441184958845:web:2be36c1ec33a7800b9f414"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, provider,storage};
export default db;