import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import axios from 'axios';
import { Link, Redirect, useRouter } from 'expo-router';
import { auth } from '../../../firebaseConfig';
import ip  from '../../../ipAddress';






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
  const [modalVisible, setModalVisible] = useState(false); // To control the delete confirmation popup
  const router = useRouter();

  const email = auth.currentUser.email;




  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://${ip}:5000/customer/cusRead/${email}`);
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


  const handleSaveChanges = async () => {
    try {
      // Use user's email instead of _id for the request
      const response = await axios.put(`http://${ip}:5000/customer/cusUpdate/${email}`, user);
      
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

  // Function to delete profile
  const handleDeleteProfile = async () => {
    try {
    
  
      
      await axios.delete(`http://${ip}:5000/customer/cusDelete/${email}`);
  
      // Show success alert and redirect to login after successful deletion
      Alert.alert('Success', 'Profile deleted successfully.', [
        { text: 'OK', onPress: () => router.push('/login') },
      ]);
    } catch (error) {
      console.error('Error deleting profile:', error);
      Alert.alert('Error', 'Failed to delete profile.');
    }
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
    editable={isEditing} // First name is editable
    onChangeText={(text) => setUser({ ...user, cusFname: text })}
  />

  <Text style={styles.label}>Last Name</Text>
  <TextInput
    style={styles.input}
    value={user.cusLname}
    editable={isEditing} // Last name is editable
    onChangeText={(text) => setUser({ ...user, cusLname: text })}
  />

  <Text style={styles.label}>Email Address</Text>
  <TextInput
    style={styles.input}
    value={user.cusMail}
    editable={false} // Email is not editable
    onChangeText={(text) => setUser({ ...user, cusMail: text })}
  />

  <Text style={styles.label}>Phone Number</Text>
  <TextInput
    style={styles.input}
    value={user.pNum ? user.pNum.toString() : ''}
    editable={isEditing} // Phone number is editable
    onChangeText={(text) => setUser({ ...user, pNum: text })}
  />

  <Text style={styles.label}>Address</Text>
  <TextInput
    style={styles.input}
    value={user.cusAddr}
    editable={isEditing} // Address is editable
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
          <View>
            {/* Edit button when not in editing mode */}
            <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Edit Details</Text>
            </TouchableOpacity>

            {/* Delete profile button */}
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={() => setModalVisible(true)}  // Show confirmation modal
            >
              <Text style={styles.buttonText}>Delete Profile</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Confirmation Modal for deleting profile */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to delete your profile?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={handleDeleteProfile}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setModalVisible(false)}  // Close modal
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
               
              </View>
            </View>
          </View>
        </Modal>
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
    paddingLeft: 15,
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
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f44336', // Red color for Cancel button
  },
  deleteButton: {
    backgroundColor: '#f44336', // Red color for Delete button
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',  // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 8,
    width: 100,
    alignItems: 'center',
  },
});

export default UserDetails;
