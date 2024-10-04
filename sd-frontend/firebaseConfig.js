import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC32wG25e1-9_s_7OavPj1zxljQtWGFiG8",
  authDomain: "smart-dispose.firebaseapp.com",
  projectId: "smart-dispose",
  storageBucket: "smart-dispose.appspot.com",  // Firebase Storage bucket
  messagingSenderId: "433816620177",
  appId: "1:433816620177:web:7ca4600b9b5aed26ce0330"
};

// Initialize Firebase if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Initialize Firebase Authentication with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firebase Storage
export const storage = getStorage(app);
