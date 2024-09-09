
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

// Base URL for API
const BASE_URL = 'http://192.168.56.1:5000';

// Delete Inquiry Component
const InqDelete = ({ inquiryId }) => {
  const navigation = useNavigation();

  // Function to delete an inquiry by ID
  const handleDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/inquiry/deleteInquiry/${inquiryId}`);
      alert('Inquiry deleted successfully');
      navigation.goBack();  // Navigate back after deletion
    } catch (error) {
      alert('Failed to delete inquiry');
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this inquiry?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: handleDelete
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Delete Inquiry" color="red" onPress={showAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default InqDelete;
