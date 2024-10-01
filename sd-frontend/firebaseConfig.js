import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC32wG25e1-9_s_7OavPj1zxljQtWGFiG8",
  authDomain: "smart-dispose.firebaseapp.com",
  projectId: "smart-dispose",
  storageBucket: "smart-dispose.appspot.com",
  messagingSenderId: "433816620177",
  appId: "1:433816620177:web:7ca4600b9b5aed26ce0330",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
