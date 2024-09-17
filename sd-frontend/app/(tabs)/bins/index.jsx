import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import NObin from "../../assets/NObin.png";
import Rbin from "../../assets/Rbin.png";
import Obin from "../../assets/Obin.png";
import piechart from "../../assets/pieChart.png";

const BinDashboard = () => {
  const router = useRouter();

  const [selectedBin, setSelectedBin] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.binsContainer}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/bins/garbagebinscreen",
                params: { type: "no" },
              })
            }
          >
            <View
              style={[
                styles.binItem,
                selectedBin === "Non Organic" && styles.selectedBin,
              ]}
            >
              <Image source={NObin} style={styles.binImage} />
              <Text style={styles.binLabel}>Non organic</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/bins/garbagebinscreen",
                params: { type: "r" },
              })
            }
          >
            <View
              style={[
                styles.binItem,
                selectedBin === "Recycle" && styles.selectedBin,
              ]}
            >
              <Image source={Rbin} style={styles.binImage} />
              <Text style={styles.binLabel}>Recycle</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/bins/garbagebinscreen",
                params: { type: "o" },
              })
            }
          >
            <View
              style={[
                styles.binItem,
                selectedBin === "Organic" && styles.selectedBin,
              ]}
            >
              <Image source={Obin} style={styles.binImage} />
              <Text style={styles.binLabel}>Organic</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/*pie graph */}

        <Image source={piechart} style={styles.chartImage} />

        {/* Waste Data */}
        <View style={styles.wasteData}>
          <Text style={styles.label}>Total waste</Text>
          <Text style={styles.value}>{480} kg</Text>
        </View>
        <View style={styles.wasteData}>
          <Text style={styles.label}>Total Organic Waste</Text>
          <Text style={styles.value}>140 kg</Text>
        </View>
        <View style={styles.wasteData}>
          <Text style={styles.label}>Total Non-organic Waste</Text>
          <Text style={styles.value}>125 kg</Text>
        </View>
        <View style={styles.wasteData}>
          <Text style={styles.label}>Total Recyclable Waste</Text>
          <Text style={styles.value}>215 kg</Text>
        </View>
        <View style={styles.wasteData}>
          <Text style={styles.label}>Total Payments</Text>
          <Text style={styles.value}>Rs.111460.80</Text>
        </View>
        <View style={styles.wasteData}>
          <Text style={styles.label}>Paybacks</Text>
          <Text style={styles.value}>Rs.10160.40</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BinDashboard;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center",
    marginBottom: 20,
  },
  binsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  binItem: {
    alignItems: "center",
  },
  binImage: {
    width: 60,
    height: 100,
    resizeMode: "contain",
  },
  binLabel: {
    marginTop: 5,
    fontSize: 14,
    color: "#555",
  },
  selectedBin: {
    borderBottomWidth: 2,
    borderBottomColor: "#00B200",
  },
  chartImage: {
    alignSelf: "center",
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  wasteData: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomColor: "#aaa",
    borderBottomWidth: 1,
    marginBottom: 10,
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
});
