import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { Link, router, useRouter } from 'expo-router'
import axios from 'axios'; // Import axios
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import  ip  from '../../ipAddress';


const SignupForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(''); // New address state
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleRegister = () => {

    createUserWithEmailAndPassword(auth, email, password)
    
    .then((userCredential) => {
      router.push('/login');
      console.log('Logged in as:', userCredential.user.email);
      handleSignup()
    })
    .catch((error) => {
      console.error('Error signing in:', error.message);
    });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhone = (phone) => {
    const phonePattern = /^[0-9]{10}$/; // Assumes phone number should be 10 digits
    return phonePattern.test(phone);
  };

  const validateField = (field, value) => {
    const newErrors = { ...errors };

    // Validation logic for each field
    if (field === 'firstName') {
      if (!value) newErrors.firstName = 'First name is required';
      else delete newErrors.firstName;
    }

    if (field === 'lastName') {
      if (!value) newErrors.lastName = 'Last name is required';
      else delete newErrors.lastName;
    }

    if (field === 'email') {
      if (!value || !validateEmail(value)) newErrors.email = 'Valid email is required';
      else delete newErrors.email;
    }

    if (field === 'phone') {
      if (!value || !validatePhone(value)) newErrors.phone = 'Valid phone number is required';
      else delete newErrors.phone;
    }

    if (field === 'address') {
      if (!value) newErrors.address = 'Address is required';
      else delete newErrors.address;
    }

    if (field === 'password') {
      if (!value) newErrors.password = 'Password is required';
      else delete newErrors.password;
    }

    if (field === 'confirmPassword') {
      if (value !== password) newErrors.confirmPassword = 'Passwords do not match';
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const handleSignup = async () => {
    const newErrors = {};

    if (!firstName) newErrors.firstName = 'First name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!email || !validateEmail(email)) newErrors.email = 'Valid email is required';
    if (!phone || !validatePhone(phone)) newErrors.phone = 'Valid phone number is required';
    if (!address) newErrors.address = 'Address is required'; // Validate address
    if (!password) newErrors.password = 'Password is required';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Prepare data for backend (update field names to match backend model)
    const data = {
      cusFname: firstName,
      cusLname: lastName,
      cusMail: email,
      pNum: phone,
      cusAddr: address, 
      cusPassword: password,
      profilePictureUrl: profilePictureUrl,
    };

    try {
      // Send a POST request to the backend using axios
      const response = await axios.post(`http://${ip}:5000/customer/cusCreate`, data);

      // Handle the response
      if (response.status === 200) {
        Alert.alert('Success', 'Signup successful!');
      } else {
        Alert.alert('Error', 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      Alert.alert('Error', 'An error occurred during signup. Please try again later.');
    }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    
    <SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <Text style={styles.header}>SIGN UP YOUR ACCOUNT</Text>
    <View style={styles.inputContainer}>
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
              validateField('firstName', text); // Validate as user types
            }}
            onBlur={() => validateField('firstName', firstName)}
          />
          {errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              validateField('lastName', text); // Validate as user types
            }}
            onBlur={() => validateField('lastName', lastName)}
          />
          {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
        </View>
      </View>

      <Text style={styles.label}>Email Address</Text>
      <TextInput
        style={[styles.input, { width: screenWidth - 40 }]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          validateField('email', text); // Validate as user types
        }}
        keyboardType="email-address"
        onBlur={() => validateField('email', email)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={[styles.input, { width: screenWidth - 40 }]}
        placeholder="Phone Number"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          validateField('phone', text); // Validate as user types
        }}
        keyboardType="phone-pad"
        onBlur={() => validateField('phone', phone)}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={[styles.input, { width: screenWidth - 40 }]}
        placeholder="Address"
        value={address}
        onChangeText={(text) => {
          setAddress(text);
          validateField('address', text); // Validate as user types
        }}
        onBlur={() => validateField('address', address)}
      />
      {errors.address && <Text style={styles.error}>{errors.address}</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, { width: screenWidth - 40 }]}
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          validateField('password', text); // Validate as user types
        }}
        secureTextEntry={true}
        onBlur={() => validateField('password', password)}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={[styles.input, { width: screenWidth - 40 }]}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          validateField('confirmPassword', text); // Validate as user types
        }}
        secureTextEntry={true}
        onBlur={() => validateField('confirmPassword', confirmPassword)}
      />
      {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}
    </View>

    <TouchableOpacity style={styles.button} onPress={handleRegister}>
      <Text style={styles.buttonText}>SIGN UP</Text>
    </TouchableOpacity>
    <Link href={'login'} style={{textAlign: 'center'}}>Already have an account? <Text style={{color: 'blue'}}>LOG IN</Text></Link>
  </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  halfWidth: {
    flex: 1,
    marginRight: 10, // Adds spacing between the two inputs
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default SignupForm;