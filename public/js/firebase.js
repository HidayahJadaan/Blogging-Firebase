let firebaseConfig = {
    apiKey: "AIzaSyAGZiNfPq3jTCcyG5e49T9R6JLl_TVtpK0",
    authDomain: "blogging-website-4ec0e.firebaseapp.com",
    projectId: "blogging-website-4ec0e",
    storageBucket: "blogging-website-4ec0e.appspot.com",
    messagingSenderId: "22378772154",
    appId: "1:22378772154:web:82e7e59a4792ccb7a8b483",
    measurementId: "G-GX9506BC0C"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();