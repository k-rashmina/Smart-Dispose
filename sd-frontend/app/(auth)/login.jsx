import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [router, setRouter] = useState(useRouter());

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        router.push("/home");

        console.log("Logged in as:", userCredential.user.email);
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
      });
  };

  // Handle back button press specifically for the login screen
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Show confirmation alert before exiting the app
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default back button behavior on login screen
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      // Cleanup the event listener when leaving the login screen
      return () => backHandler.remove();
    }, [])
  );

  // Validate email in real-time as user types
  useEffect(() => {
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  }, [email]);

  // Validate password in real-time as user types
  useEffect(() => {
    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  }, [password]);

  // Simple email validation
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOG IN TO YOUR ACCOUNT</Text>

      {/* Email Field with Label */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="ex: jon.smith@email.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

      {/* Password Field with Label */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="**********"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {errors.password ? (
        <Text style={styles.error}>{errors.password}</Text>
      ) : null}

      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
        disabled={!!errors.email || !!errors.password}
      >
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>

      <Link href={"/register"} style={{ textAlign: "center" }}>
        Don't have an account? <Text style={{ color: "blue" }}>SIGN UP</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
