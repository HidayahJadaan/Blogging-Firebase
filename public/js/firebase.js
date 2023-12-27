// Firebase configuration object containing credentials and settings
let firebaseConfig = {
    apiKey: "AIzaSyAGZiNfPq3jTCcyG5e49T9R6JLl_TVtpK0",// API key for authentication
    authDomain: "blogging-website-4ec0e.firebaseapp.com",// Domain for authentication
    projectId: "blogging-website-4ec0e",// ID of the Firebase project
    storageBucket: "blogging-website-4ec0e.appspot.com",// Storage bucket for file storage
    messagingSenderId: "22378772154",// Sender ID for messaging
    appId: "1:22378772154:web:82e7e59a4792ccb7a8b483",// Application ID
    measurementId: "G-GX9506BC0C"// Measurement ID for analytics
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();