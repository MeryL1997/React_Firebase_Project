import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBPdVt6LhJgh1TFU9dsJVWZN6Nwfh0ZrzQ",
    authDomain: "projectreact-ebc52.firebaseapp.com",
    databaseURL: "https://projectreact-ebc52.firebaseio.com",
    projectId: "projectreact-ebc52",
    storageBucket: "",
    messagingSenderId: "40124774629",
    appId: "1:40124774629:web:bf175568e13b309b"
  };
  
  // Initialize Firebase
  const Fire=firebase.initializeApp(firebaseConfig);
  export default Fire;
