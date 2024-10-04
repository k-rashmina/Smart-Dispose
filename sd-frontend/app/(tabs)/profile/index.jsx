// import { StyleSheet, Text, View, Button, BackHandler, Alert } from 'react-native'
// import React, {useEffect} from 'react'
// import { Link, useRouter } from 'expo-router'
// import { logoutUser } from '../../(auth)/Auth';




// const Profile = () => { 


//   const router = useRouter();

//   const handleLogout = () => {
//     logoutUser ().then(() => {
//       router.push("/login");
//     });

//   };
//   return (
//     <View>
//       <Text>Profile</Text>
//       <Link style={{marginTop: 50, alignSelf: 'center', color: 'blue', fontSize: 20}} href={'/profile/inqlist'}>Inquiries</Link>
//       <Link style={{marginTop: 50, alignSelf: 'center', color: 'blue', fontSize: 20}} href={'/profile/userDetails'}>UserDetails</Link>
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})



import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { logoutUser } from '../../(auth)/Auth';

const Profile = () => { 
  const router = useRouter();

  const handleLogout = () => {
    logoutUser().then(() => {
      router.push("/login");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/profile/inqlist')}
      >
        <Text style={styles.buttonText}>Inquiries</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('/profile/userDetails')}
      >
        <Text style={styles.buttonText}>User Details</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logoutButton} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50', // Theme color
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50', // Theme color
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#d9534f', // Red for logout
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  }
});
