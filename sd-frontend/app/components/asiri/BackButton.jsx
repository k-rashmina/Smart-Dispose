// components/BackButton.jsx

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing an icon
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation(); // Get navigation object

  const handleBackPress = () => {
    navigation.goBack(); // Navigate back on press
  };

  return (
    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
      <Icon name="arrow-back" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 20, // Adjust this value to position it at the top
    left: 20, // Align to the right
    zIndex: 1, // Ensure it's on top of other elements
    backgroundColor: '#4CAF50', // Green background
    padding: 10,
    borderRadius: 30,
  },
});

export default BackButton;
