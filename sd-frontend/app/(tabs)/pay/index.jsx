import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { getCustomerPoints } from "../../library/apiRequests/customerPointsClient";

const Index = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const router = useRouter();

  const fetchPoints = async () => {
    try {
      const pointsResponse = await getCustomerPoints();
      setPoints(pointsResponse.points);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, [refreshFlag]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const handleRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsTitle}>Your Reward Points!</Text>
        <Text style={styles.pointsValue}>{points}</Text>
        <Text style={styles.pointsSubtitle}>Keep Collecting!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => {
            router.push("pay/paymentSummary");
          }}
        >
          <Text style={styles.buttonText}>Pay Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => {
            router.push("pay/currentGarbageCollection");
          }}
        >
          <Text style={styles.buttonText}>Waste Records</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh Points</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentHistoryButton}
        onPress={() => {
          router.push("pay/paymentHistory");
        }}
      >
        <Text style={styles.paymentHistoryButtonText}>Payment History</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Every point counts towards a greener future 🌍
        </Text>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafc", // Muted off-white background for a clean look
  },
  pointsContainer: {
    backgroundColor: "#f0f4f8", // Soft light gray background
    padding: 30,
    borderRadius: 16, // Slightly larger border radius
    marginBottom: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15, // Subtle shadow for a more elegant effect
    shadowRadius: 8,
    elevation: 3,
  },
  pointsTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#34495e", // Darker, muted navy blue for a professional tone
  },
  pointsValue: {
    fontSize: 42, // Larger font size for emphasis
    fontWeight: "800",
    color: "#2ecc71", // Elegant green for positive points value
    marginVertical: 8,
  },
  pointsSubtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#7f8c8d", // Subtle gray subtitle text
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: "#2980b9", // Muted royal blue for the primary action
    padding: 18,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  buttonSecondary: {
    backgroundColor: "#8e44ad", // Refined purple for secondary actions
    padding: 18,
    borderRadius: 12,
    width: "48%",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  refreshButton: {
    backgroundColor: "#27ae60", // Sophisticated green for refreshing
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  refreshButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  paymentHistoryButton: {
    backgroundColor: "#34495e", // Professional dark blue for Payment History
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  paymentHistoryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafc",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: "#7f8c8d",
  },
  footer: {
    marginTop: 40,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ecf0f1", // Light gray footer
    borderRadius: 12,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50", // Elegant navy blue text for the footer
  },
});
