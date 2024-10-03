import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import BackButton from "../../components/asiri/BackButton";
import InqDelete from "./inqDelete";
import { ip } from "../../../ipAddress";

const InquiryDetails = () => {
  const route = useRoute(); // Get passed inquiry data
  const navigation = useNavigation(); // To navigate back after update
  const { inquiry } = route.params; // Get inquiry data from route params

  // Initialize state with inquiry data
  const [inquiryData, setInquiryData] = useState({
    userName: inquiry.userName || "",
    email: inquiry.email || "",
    category: inquiry.category || "",
    subject: inquiry.subject || "",
    description: inquiry.description || "",
  });

  // Function to handle form submission
  const handleUpdate = () => {
    axios
      .put(
        `http://${ip}:5000/inquiry/updateInquiry/${inquiry._id}`,
        inquiryData
      )
      .then((response) => {
        alert("Inquiry updated successfully");
        navigation.goBack(); // Navigate back after update
      })
      .catch((error) => {
        console.error("Error updating inquiry", error);
        alert("Failed to update inquiry");
      });
  };

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={styles.heading}>Modify your Inquiry</Text> */}
      <Text style={styles.label}>User Name</Text>
      {/* Back Button */}
      {/* <BackButton /> */}
      <TextInput
        placeholder="Enter User Name"
        value={inquiryData.userName}
        onChangeText={(text) =>
          setInquiryData({ ...inquiryData, userName: text })
        }
        editable={false}
        style={styles.input}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Enter Email"
        value={inquiryData.email}
        onChangeText={(text) => setInquiryData({ ...inquiryData, email: text })}
        editable={false}
        style={styles.input}
        keyboardType="email-address"
      />

      {/* <Text style={styles.label}>Category</Text>
      <TextInput
        placeholder="Enter Category"
        value={inquiryData.category}
        onChangeText={(text) =>
          setInquiryData({ ...inquiryData, category: text })
        }
        style={styles.input}
      /> */}
      <Text style={styles.label}>Category</Text>
      <View style={styles.dropdown}>
        <Picker
          selectedValue={inquiryData.category} // Use inquiryData.category for selected value
          onValueChange={(itemValue) => {
            setInquiryData({ ...inquiryData, category: itemValue }); // Update inquiryData with selected category
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

      <Text style={styles.label}>Subject</Text>
      <TextInput
        placeholder="Enter Subject"
        value={inquiryData.subject}
        onChangeText={(text) =>
          setInquiryData({ ...inquiryData, subject: text })
        }
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        placeholder="Enter Description"
        value={inquiryData.description}
        onChangeText={(text) =>
          setInquiryData({ ...inquiryData, description: text })
        }
        style={[styles.input, styles.textArea]}
        multiline={true}
        numberOfLines={4}
      />

      <Button title="Update Inquiry" color="#4CAF50" onPress={handleUpdate} />
      {/* Delete Inquiry */}
      <InqDelete inquiryId={inquiry._id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginVertical: 10, // Space around the heading
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    height: 40,
    borderColor: "#4CAF50",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    padding: 10,
  },
  dropdown: {
    
    borderWidth: 1,
    borderColor: '#4CAF50', // Green theme
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: 10,
    textAlign: "center",
    fontSize: 20,
  },
});

export default InquiryDetails;
