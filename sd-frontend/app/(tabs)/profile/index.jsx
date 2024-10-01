import { StyleSheet, Text, View, Button, BackHandler, Alert } from 'react-native'
import React, {useEffect} from 'react'
import { Link, useRouter } from 'expo-router'
import { logoutUser } from '../../(auth)/Auth';




const Profile = () => { 


  const router = useRouter();

  // Handle back button press behavior
//   useEffect(() => {
//     const backAction = () => {
//       // When back is pressed, instead of going back to the login page, exit the app
//       Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
//         {
//           text: "Cancel",
//           onPress: () => null,
//           style: "cancel",
//         },
//         { text: "YES", onPress: () => BackHandler.exitApp() },
//       ]);
//       return true; // Prevent default back button behavior
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );

//     // Cleanup the event listener when component unmounts
//     return () => backHandler.remove();
//   }, []);

  const handleLogout = () => {
    logoutUser ().then(() => {
      router.push("/login");
    });

  };
  return (
    <View>
      <Text>Profile</Text>
      <Link style={{marginTop: 50, alignSelf: 'center', color: 'blue', fontSize: 20}} href={'/profile/inqlist'}>Inquiries</Link>
      <Link style={{marginTop: 50, alignSelf: 'center', color: 'blue', fontSize: 20}} href={'/profile/userDetails'}>UserDetails</Link>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})