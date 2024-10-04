import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link } from "expo-router";
import { getGarbageCollectionRecordsForCurrentMonth } from "../../library/apiRequests/garbageCollectionClient";
import { auth } from "../../../firebaseConfig";

const index = () => {
  const [garbageCollectionRecords, setGarbageCollectionRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGarbageCollectionRecords = async () => {
      try {
        const records = await getGarbageCollectionRecordsForCurrentMonth();
        setGarbageCollectionRecords(records);
      } catch (error) {
        console.error("Error fetching garbage collection records:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGarbageCollectionRecords();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Garbage Collection Records for Current Month
      </Text>
      <FlatList
        data={garbageCollectionRecords}
        keyExtractor={(item) => item._id} // Assuming the record has an _id field
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text>Type: {item.garbageType}</Text>
            <Text>Weight: {item.weight} kg</Text>
            <Text>
              Date: {new Date(item.collectionDate).toLocaleDateString()}
            </Text>
            <Text>Time: {item.collectionTime}</Text>
          </View>
        )}
      />
      <Link href="/pay/paymentSummary">Go to Pay</Link>
      <Text>{auth.currentUser.email}</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recordItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
