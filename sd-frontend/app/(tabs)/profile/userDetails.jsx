import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';
import {Link} from 'expo-router';

const UserDetails = ({ route, navigation }) => {
  const [user, setUser] = useState({
    cusFname: '',
    cusLname: '',
    cusMail: '',
    pNum: '',
    cusAddr: '',
    profilePictureUrl: ''
  });
  
  const [originalUser, setOriginalUser] = useState(null);  // To keep track of original data
  const [isEditing, setIsEditing] = useState(false);       // To toggle between view and edit mode
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.56.1:5000/customer/cusRead/66dbe2066ffc9e99ed1a62ef`);
        setUser(response.data);
        setOriginalUser(response.data); // Save the original data
      } catch (error) {
        console.error('Error fetching user details:', error);
        Alert.alert('Error', 'Failed to load user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Function to save changes
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`http://192.168.56.1:5000/customer/cusUpdate/66dbe2066ffc9e99ed1a62ef`, user);
      Alert.alert('Success', 'User details updated successfully.');
      setIsEditing(false);  // Exit editing mode
      setOriginalUser(user); // Save the updated data as the original state
    } catch (error) {
      console.error('Error updating user details:', error);
      Alert.alert('Error', 'Failed to update user details.');
    }
  };

  // Function to cancel editing
  const handleCancel = () => {
    setUser(originalUser);  // Revert to original user data
    setIsEditing(false);    // Exit editing mode
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Text>No user data found.</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>User Details</Text>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: user.profilePictureUrl || 'https://via.placeholder.com/150' }} // Placeholder if no profile picture
            style={styles.profilePicture}
          />
        </View>

        {/* Displaying user details in TextInput fields */}
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={user.cusFname}
            editable={isEditing}
            onChangeText={(text) => setUser({ ...user, cusFname: text })}
          />

          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={user.cusLname}
            editable={isEditing}
            onChangeText={(text) => setUser({ ...user, cusLname: text })}
          />

          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={user.cusMail}
            editable={isEditing}
            onChangeText={(text) => setUser({ ...user, cusMail: text })}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={user.pNum ? user.pNum.toString() : ''}
            editable={isEditing}
            onChangeText={(text) => setUser({ ...user, pNum: text })}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={user.cusAddr}
            editable={isEditing}
            onChangeText={(text) => setUser({ ...user, cusAddr: text })}
          />
        </View>

        {isEditing ? (
          <View>
            {/* Save Changes and Cancel buttons */}
            <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Edit button when not in editing mode
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Edit Details</Text>
          </TouchableOpacity>
        )}
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 0,
    paddingTop: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  detailsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    paddingVertical: 8,
    marginBottom: 15,
    width: Dimensions.get('window').width * 0.9,
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336', // Red color for Cancel button
  },
});

export default UserDetails;