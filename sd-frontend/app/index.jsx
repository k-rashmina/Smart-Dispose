import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {auth} from "../firebaseConfig";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth"; 

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged (auth, (user) => {
      setUser(user);
      setInitializing(false);
    }
    );
    return unsubscribe;
}, []);

if (initializing) return null;

return user ? <Redirect href="/home" /> : <Redirect href="/login" />;
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
