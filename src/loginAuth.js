import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

// user authentication code
export function init() {
  const firebaseConfig = {
    apiKey: "AIzaSyBwJ6TJKefFoPEU0IZ4zc0kHz57vVnX2Ws",
    authDomain: "cinemania-89b4f.firebaseapp.com",
    projectId: "cinemania-89b4f",
    storageBucket: "cinemania-89b4f.appspot.com",
    messagingSenderId: "754757248247",
    appId: "1:754757248247:web:fb860fc0dca3e09108dff2",
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      console.log("logged in");
      console.log(user.uid);
    } else {
      console.log("no user");
    }
  });
  return auth;
}
export function signupUser(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("created user");
      console.log("signed in");
      // console.log(cred.user);
    })
    .catch((e) => {
      console.log(e);
    });
}

export function loginUser(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("signed in");
    })
    .catch((e) => console.log(e));
}

export function signoutUser(auth) {
  signOut(auth)
    .then(() => {
      console.log("signed out user");
      return 1;
    })
    .catch((e) => -1);
}

export async function google(auth) {
  const provider = await new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}

export async function resetPass(auth,email){
   let res = await sendPasswordResetEmail(auth,email).catch(e=>-1);
   if(res==undefined)return 1;
   return res;
}