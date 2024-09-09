

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/asiri/BackButton';

const inqCreate = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({});

  const navigation = useNavigation();

  const validateUserName = (name) => {
    if (!name) {
      return 'User Name is required';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    return '';
  };

  const validateCategory = (category) => {
    if (!category) {
      return 'Category is required';
    }
    return '';
  };

  const validateSubject = (subject) => {
    if (!subject) {
      return 'Subject is required';
    }
    return '';
  };

  const validateDescription = (description) => {
    if (!description) {
      return 'Description is required';
    }
    return '';
  };

  const handleSubmit = () => {
    const userNameError = validateUserName(userName);
    const emailError = validateEmail(email);
    const categoryError = validateCategory(category);
    const subjectError = validateSubject(subject);
    const descriptionError = validateDescription(description);

    if (userNameError || emailError || categoryError || subjectError || descriptionError) {
      setErrors({
        userName: userNameError,
        email: emailError,
        category: categoryError,
        subject: subjectError,
        description: descriptionError,
      });
      return;
    }

    axios.post('http://192.168.56.1:5000/inquiry/createInquiry', {
      userName,
      email,
      category,
      subject,
      description,
    })
    .then(response => {
        alert('Inquiry created successfully');
        navigation.goBack();
      })
      .catch(error => console.error('Error creating inquiry', error));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButton />
      <Text style={styles.heading}>Contact Us</Text>
      
      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.input}
        value={userName}
        onChangeText={(text) => {
          setUserName(text);
          setErrors((prev) => ({ ...prev, userName: validateUserName(text) }));
        }}
        placeholder="Enter your name"
      />
      {errors.userName ? <Text style={styles.errorText}>{errors.userName}</Text> : null}

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prev) => ({ ...prev, email: validateEmail(text) }));
        }}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <Text style={styles.label}>Category</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => {
            setCategory(itemValue);
            setErrors((prev) => ({ ...prev, category: validateCategory(itemValue) }));
          }}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Payment Issue" value="Payment Issue" />
          <Picker.Item label="Service Issue" value="Service Issue" />
          <Picker.Item label="Technical Issue" value="Technical Issue" />
          <Picker.Item label="Login Issue" value="Login Issue" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>
      {errors.category ? <Text style={styles.errorText}>{errors.category}</Text> : null}

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={(text) => {
          setSubject(text);
          setErrors((prev) => ({ ...prev, subject: validateSubject(text) }));
        }}
        placeholder="Enter the subject"
      />
      {errors.subject ? <Text style={styles.errorText}>{errors.subject}</Text> : null}

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          setErrors((prev) => ({ ...prev, description: validateDescription(text) }));
        }}
        placeholder="Enter the description.If you contacted us previously for the same case, Please mention that reference number."
        multiline
        numberOfLines={4}
      />
      {errors.description ? <Text style={styles.errorText}>{errors.description}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title="Submit Inquiry" onPress={handleSubmit} color="#4CAF50" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginVertical: 10, // Space around the heading
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    
    borderWidth: 1,
    borderColor: '#4CAF50', // Green theme
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100, // Text area for description
    textAlignVertical: 'top',
  },
  dropdown: {
    
    borderWidth: 1,
    borderColor: '#4CAF50', // Green theme
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default inqCreate;