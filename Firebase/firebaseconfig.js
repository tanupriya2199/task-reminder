import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyCpL9mmMSh3k0zfaYRb83ay1r5faFmVR5k',
  authDomain: 'react-native-chat-app-d0b82.firebaseapp.com',
  databaseURL:
    'https://react-native-chat-app-d0b82-default-rtdb.firebaseio.com',
  projectId: 'react-native-chat-app-d0b82',
  storageBucket: 'react-native-chat-app-d0b82.appspot.com',
  messagingSenderId: '172641811654',
  appId: '1:172641811654:web:001cabcd2a3b97c78b2bc7',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.database();

export const firebaseAuth = firebaseApp.auth();
