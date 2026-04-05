// firebase.js — shared Firebase setup, included on every page
// Always load config.js BEFORE this file

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

// Redirects to auth page if no one is logged in.
// Call this at the top of every protected page.
function requireAuth(callback) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = 'auth.html';
    } else {
      callback(user);
    }
  });
}