import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const router = useRouter();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default back button behavior
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => backHandler.remove();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Smart Dispose!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("bins");
          }}
        >
          <Text style={styles.buttonText}>🗑️ Go to bins</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("pay");
          }}
        >
          <Text style={styles.buttonText}>💳 Go to pay</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.fullWidthButton}
        onPress={() => {
          router.push("profile");
        }}
      >
        <Text style={styles.buttonText}>👤 Go to profile</Text>
      </TouchableOpacity>

      <View style={styles.creativeArea}>
        <Text style={styles.creativeText}>Your Waste Matters! ♻️</Text>
        <Text style={styles.creativeDescription}>
          Every action counts in keeping our environment clean. Join us in our
          mission to manage waste responsibly and make a difference in our
          community!
        </Text>
        <Text style={styles.creativeDescription}>
          Let’s work together to recycle and reduce waste for a sustainable
          future. 🌱
        </Text>
      </View>

      <Text style={styles.quickAccessHeading}>Quick Access</Text>

      <View style={styles.quickAccessContainer}>
        <TouchableOpacity
          style={styles.quickAccessButton}
          onPress={() => {
            router.push("pay/paymentHistory");
          }}
        >
          <Text style={styles.buttonText}>📜 Payment History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickAccessButton}
          onPress={() => {
            router.push("home/currentGarbageCollection");
          }}
        >
          <Text style={styles.buttonText}>♻️ Waste Records</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // Light background color
    padding: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2C3E50", // Darker color for text
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#3498DB", // Blue button color
    borderRadius: 5,
    padding: 15,
    width: "45%", // Buttons take up 45% of the width
    alignItems: "center",
  },
  fullWidthButton: {
    backgroundColor: "#E67E22", // Orange button color
    borderRadius: 5,
    padding: 15,
    width: "100%",
    alignItems: "center",
    marginVertical: 10, // Space between buttons
  },
  buttonText: {
    color: "#FFFFFF", // White text color
    fontSize: 16,
  },
  creativeArea: {
    width: "100%",
    height: 300,
    backgroundColor: "#D5DBDB", // Light gray for the creative area
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
  },
  creativeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 5,
  },
  creativeDescription: {
    fontSize: 20,
    color: "#34495E",
    textAlign: "center",
    marginBottom: 5,
  },
  quickAccessHeading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    alignSelf: "flex-start", // Left align the heading
    marginVertical: 10,
  },
  quickAccessContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  quickAccessButton: {
    backgroundColor: "#1ABC9C", // Teal button color
    borderRadius: 5,
    padding: 15,
    width: "45%",
    alignItems: "center",
  },
});
