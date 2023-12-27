// Firebase configuration object containing credentials and settings
let firebaseConfig = {
    apiKey: "YOUR_API_KEY", // API key for authentication
    authDomain: "YOUR_AUTH_DOMAIN", // Domain for authentication
    projectId: "YOUR_PROJECT_ID", // ID of the Firebase project
    storageBucket: "YOUR_STORAGE_BUCKET", // Storage bucket for file storage
    messagingSenderId: "YOUR_SENDER_ID", // Sender ID for messaging
    appId: "YOUR_APP_ID", // Application ID
    measurementId: "YOUR_MEASUREMENT_ID" // Measurement ID for analytics
};

// Initialize Firebase with the provided configuration
firebase.initializeApp(firebaseConfig);

// Access Firestore database from Firebase
let db = firebase.firestore();
