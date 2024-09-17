import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

import BinLevel from "../../components/kalindu/BinLevel";
import wasteLevel from "../../assets/waste-meter.png";

const GarbageBinScreen = () => {
  const cusID = "66dacce98ee64814f86ae143";

  const { type } = useLocalSearchParams();

  const [binData, setBinData] = useState({});

  useEffect(() => {
    axios
      .get(`http://10.0.2.2:5000/bin/getcusbindata?cusID=${cusID}&type=${type}`)
      .then((res) => {
        setBinData(res.data);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, position: "relative" }}
      >
        <BinLevel type={type} level={binData.current_capacity || 0} />
        <Image source={wasteLevel} style={styles.wasteMeter} />

        <View style={styles.infoSection}>
          <View style={styles.infogroup}>
            <Text style={styles.label}>Current Level</Text>
            <Text style={styles.value}>{`${
              binData.current_capacity || 0
            } l`}</Text>
          </View>
          <View style={styles.infogroup}>
            <Text style={styles.label}>Last Emptied</Text>
            <Text style={styles.value}>30 Jul 2024</Text>
          </View>
          <View style={styles.infogroup}>
            <Text style={styles.label}>Payment Amount</Text>
            <Text style={styles.value}>Rs.300.00</Text>
          </View>
          <View style={styles.infogroup}>
            <Text style={styles.label}>Payback Amount</Text>
            <Text style={styles.value}>Rs.29.40</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View Graph</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Request Collection</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GarbageBinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    marginTop: -50,
    paddingTop: 30
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  wasteMeter: {
    zIndex: 99,
    height: 330,
    resizeMode: "stretch",
    top: -5,
    right: 10,
    position: "absolute",
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infogroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#aaa",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#00b400",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNavigation: {
    height: 60,
    backgroundColor: "#00b400",
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
