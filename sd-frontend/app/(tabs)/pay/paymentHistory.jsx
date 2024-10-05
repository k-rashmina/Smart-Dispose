import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getPaymentByEmail } from "../../library/apiRequests/paymentClient";
import { ConvertToUTC } from "../../utils/common/timeUtil";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentRecords = await getPaymentByEmail();
        setPayments(paymentRecords);
      } catch (error) {
        console.error("Error fetching payment records:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment History</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.paymentContainer}>
            <Text style={styles.paymentAmount}>LKR {item.amount}</Text>
            <Text style={styles.paymentId}>Payment ID: {item._id}</Text>
            <View style={styles.paymentDetailsContainer}>
              <Text style={styles.paymentDate}>
                Date: {ConvertToUTC(item.paymentDate)}
              </Text>
              <Text style={styles.paymentTime}>Time: {item.paymentTime}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: "#555",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  paymentContainer: {
    backgroundColor: "#e0f7fa", // Softer light blue background
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  paymentAmount: {
    fontSize: 32, // Larger font size for amount
    fontWeight: "bold",
    color: "#007BFF",
    textAlign: "center", // Centering the amount
    marginBottom: 10, // Space between amount and ID
  },
  paymentId: {
    fontSize: 16,
    color: "#555",
    textAlign: "center", // Center align the ID text
    marginBottom: 15, // Space below the payment ID
  },
  paymentDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  paymentDate: {
    fontSize: 16,
    color: "#333",
  },
  paymentTime: {
    fontSize: 16,
    color: "#333",
  },
});
