import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCYDS_TohcDcJ-dPIvX9uP3s05PKvIkZBg",
    authDomain: "tuneza-files.firebaseapp.com",
    databaseURL: "https://tuneza-files-default-rtdb.firebaseio.com",
    projectId: "tuneza-files",
    storageBucket: "tuneza-files.appspot.com",
    messagingSenderId: "722593796987",
    appId: "1:722593796987:web:500c8e12398def985b63de",
    measurementId: "G-5G6GM2NJXV"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export {firebase}