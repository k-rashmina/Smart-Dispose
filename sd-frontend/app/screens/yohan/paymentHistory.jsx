import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useGetPastPaymentsQuery } from "../../store/apiSlice";

const PastPayments = () => {
  // Use the query hook to fetch past payments
  const { data: payments, error, isLoading } = useGetPastPaymentsQuery();

  // Render a loading indicator while fetching data
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  // Render an error message if there's an error
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Something went wrong: {error.message}
        </Text>
      </View>
    );
  }

  // Render the list of past payments
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Payments</Text>
      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.paymentItem}>
            <Text style={styles.paymentText}>
              Customer: {item.customerName}
            </Text>
            <Text style={styles.paymentText}>Date: {item.paymentDate}</Text>
            <Text style={styles.paymentText}>Time: {item.paymentTime}</Text>
            <Text style={styles.paymentText}>
              Amount: Rs.{item.amount.toFixed(2)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paymentItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  paymentText: {
    fontSize: 16,
    color: "#333",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default PastPayments;
