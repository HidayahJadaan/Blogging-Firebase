// Firebase configuration object containing credentials and settings
let firebaseConfig = {
    apiKey: ,// API key for authentication
    authDomain: ,// Domain for authentication
    projectId:,// ID of the Firebase project
    storageBucket:,// Storage bucket for file storage
    messagingSenderId: ,// Sender ID for messaging
    appId: ,// Application ID
    measurementId:// Measurement ID for analytics
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
