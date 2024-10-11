import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getGarbageCollectionRecordsForCurrentMonth } from "../../library/apiRequests/garbageCollectionClient";

const currentGarbageCollection = () => {
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
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const getBackgroundColor = (type) => {
    switch (type) {
      case "Recyclable":
        return "#d4edda"; // Light green
      case "Organic":
        return "#fff3cd"; // Light yellow
      case "Polythene-plastic":
        return "#f8d7da"; // Light red
      case "Non-organic":
        return "#d1ecf1"; // Light blue
      default:
        return "#ffffff"; // Default white background
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Garbage Collection Records for Current Month
      </Text>
      <FlatList
        data={garbageCollectionRecords}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.recordItem,
              { backgroundColor: getBackgroundColor(item.garbageType) },
            ]}
          >
            <Text style={styles.recordType}>Type: {item.garbageType}</Text>
            <Text style={styles.recordWeight}>Weight: {item.weight} kg</Text>
            <Text style={styles.recordDate}>
              Date: {new Date(item.collectionDate).toLocaleDateString()}
            </Text>
            <Text style={styles.recordTime}>Time: {item.collectionTime}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default currentGarbageCollection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffff", // Softer light blue background
  },
  title: {
    fontSize: 26, // Larger title font
    fontWeight: "700", // Bolder title
    color: "#2C3E50", // Darker color for contrast
    marginBottom: 20,
    textAlign: "center",
  },
  recordItem: {
    padding: 15, // Reduced padding
    borderRadius: 10, // Adjusted for smaller corners
    marginBottom: 15, // Adjusted margin for better spacing
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3, // Reduced elevation for less depth
  },
  recordType: {
    fontSize: 20, // Larger font size for type
    fontWeight: "bold",
    color: "#007BFF", // Distinct color for type
    marginBottom: 5, // Space below type
  },
  recordWeight: {
    fontSize: 18, // Slightly smaller font size for weight
    fontWeight: "bold", // Bolder weight
    color: "#27ae60", // Green color for weight
    marginBottom: 5, // Space below weight
  },
  recordDate: {
    fontSize: 16, // Slightly smaller font size for date
    color: "#555", // Darker color for contrast
    marginBottom: 5, // Space below date
    fontStyle: "italic", // Italic style for date
  },
  recordTime: {
    fontSize: 16, // Slightly smaller font size for time
    color: "#777", // Lighter gray for time
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e8f0f2",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#555",
  },
});
