import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"; // Using MaterialIcons for delete

const InquiryCard = ({ item, onDelete, onPress }) => {
  return (
    <TouchableOpacity onPress={()=>
        navigation.navigate("../../screens/asiri/inqDetails", { inquiry: item })
    }>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <View>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.refId}>Ref No: {item.refId}</Text>
          </View>
          {/* Delete icon */}
          <TouchableOpacity onPress={() => onDelete(item._id)}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});

export default InquiryCard;
