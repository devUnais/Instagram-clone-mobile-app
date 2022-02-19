import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDppTzTbQx2mBnlF3x6gBPcbJb4Y_t6xHo",
    authDomain: "rn-instgramclone.firebaseapp.com",
    projectId: "rn-instgramclone",
    storageBucket: "rn-instgramclone.appspot.com",
    messagingSenderId: "689218274198",
    appId: "1:689218274198:web:56cdea03213126629d53b7",
    measurementId: "G-FVT29R52X3"
  };
  

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()


export {firebase,db}