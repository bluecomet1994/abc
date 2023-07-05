import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPQPm4XcFcu9IYIJbeuLJoTpq3XZt_EI0",
  authDomain: "affordable-ca389.firebaseapp.com",
  databaseURL: "https://affordable-ca389-default-rtdb.firebaseio.com",
  projectId: "affordable-ca389",
  storageBucket: "affordable-ca389.appspot.com",
  messagingSenderId: "745993249360",
  appId: "1:745993249360:web:da086817ebb48de9a9a755",
  measurementId: "G-39PJR6TRE4"
};

const app = initializeApp(firebaseConfig);

export default app;