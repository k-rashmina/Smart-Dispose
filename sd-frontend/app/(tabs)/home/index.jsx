import { StyleSheet, Text, View, BackHandler, Alert } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {

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
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Link style={{marginTop: 10, color: 'blue'}} href={'bins'}>Go to bins</Link>
      <Link style={{marginTop: 10, color: 'blue'}} href={'pay'}>Go to pay</Link>
      <Link style={{marginTop: 10, color: 'blue'}} href={'profile'}>Go to profile</Link>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})