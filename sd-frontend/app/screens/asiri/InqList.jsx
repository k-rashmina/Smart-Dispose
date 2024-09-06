import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button
} from "react-native";
import { Card } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'; // For the icon
import Modal from 'react-native-modal'; // For the popup modal

const InqList = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get("http://192.168.56.1:5000/inquiry/getInquiry/")
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
   // Toggle modal visibility
   const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("InquiryDetails", { inquiry: item })}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text style={styles.refId}>Ref No: {item.refId}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={inquiries}
        renderItem={renderCard}
        keyExtractor={(item) => item._id}
      />

 {/* Floating Icon Button */}
 <TouchableOpacity style={styles.iconButton} onPress={toggleModal}>
        <Icon name="add-circle" size={60} color="#007BFF" />
      </TouchableOpacity>

      {/* Popup Modal */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you want to create a new inquiry?</Text>
          <Button title="Yes, Create Inquiry" onPress={() => {
            toggleModal();  // Close modal
            navigation.navigate('CreateInquiry');  // Navigate to create page
          }} />
          <Button title="Cancel" onPress={toggleModal} color="red" />
        </View>
      </Modal>


    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
      padding: 10,
    },
    card: {
      marginVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      padding: 15,
    },
    subject: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    refId: {
      marginTop: 8,
      fontSize: 14,
      color: '#555',
    },
    iconButton: {
      position: 'absolute',
      right: 20,
      bottom: 20,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 18,
      marginBottom: 20,
    },
});
export default InqList;
