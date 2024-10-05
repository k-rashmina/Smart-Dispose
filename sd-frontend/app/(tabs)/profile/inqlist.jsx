import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";
import { Card } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { auth } from "../../../firebaseConfig";
import ip from "../../../ipAddress";

const inqlist = () => {
  const [inquiries, setInquiries] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const email = auth.currentUser.email;

  // Function to fetch inquiries
  const fetchInquiries = () => {
    axios
      .get(`http://${ip}:5000/inquiry/getAllInquiry/${email}`)
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Initial data fetch
    fetchInquiries();

    // Set interval for real-time fetching every 60 seconds (60000 ms)
    const intervalId = setInterval(() => {
      fetchInquiries();
    }, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("inqDetails", { inquiry: item });
      }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text style={styles.refId}>Refference Number: {item.refId}</Text>
          <Text style={styles.category}>Category: {item.category}</Text>
          <Text style={styles.date}>
            Submit Date: {new Date(item.creationDate).toLocaleDateString()} at{" "}
            {new Date(item.creationDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
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
        <Icon name="add-circle" size={70} color="#4CAF50" />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you need to Contact Us?</Text>

          <View style={styles.inlineButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                toggleModal();
                router.push("(tabs)/profile/inqCreate");
              }}
            >
              <Text style={[styles.buttonText, { color: "#4CAF50" }]}>
                Yes, Create Inquiry
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={[styles.buttonText, { color: "red" }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginVertical: 10, // Space around the heading
  },
  card: {
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 15,
  },
  subject: {
    fontSize: 18,
    fontWeight: "bold",
  },
  refId: {
    marginTop: 8,
    fontSize: 14,
    color: "#555",
  },
  date: {
    color: "#555",
  },
  category: {
    color: "#555",
  },
  iconButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  inlineButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default inqlist;
