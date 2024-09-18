import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import blackBin from "../../assets/black-bin.png";
import blueBin from "../../assets/blue-bin.png";
import redBin from "../../assets/red-bin.png";
import greenBin from "../../assets/green-bin.png";
import wasteMeter from "../../assets/waste-meter.png";

const BinLevel = ({ type, level }) => {
  const binFillPercentage = 50;
  const binLevel = 200;
  const binColor = type == "no" ? redBin : type == "r" ? blueBin : greenBin;
  const binContainerHeight = (level / 400) * 100;
  const binHeight = (100 - binContainerHeight) * 2;

  return (
    <View style={styles.binContainer}>
      <Image
        source={blackBin} // bin image path
        style={styles.binImage}
      />
      <View
        style={[
          styles.binFillContainer,
          { height: `${binContainerHeight}%` || 0 },
        ]}
      >
        <Image
          source={binColor}
          style={[styles.binFill, { marginTop: `-${binHeight}%` || 200 }]}
        />
      </View>
      {/* <Text style={styles.fillText}>{`${binLevel} l`}</Text> */}
    </View>
  );
};

export default BinLevel;

const styles = StyleSheet.create({
  binContainer: {
    height: 400,
    alignItems: "center",
    marginTop: -50,
    position: "relative",
  },
  binImage: {
    width: 200,
    height: 400,
    resizeMode: "contain",
  },
  binFillContainer: {
    width: 200,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
  },
  binFill: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  // fillText: {
  //   color: "black",
  //   fontWeight: "bold",
  //   fontSize: 18,
  // },
});
