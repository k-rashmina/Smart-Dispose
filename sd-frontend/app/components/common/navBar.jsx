import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomBottomNavigation = ({ navigationState, setNavigationState }) => {
  // Function to handle navigation item press
  const handlePress = (screen) => {
    setNavigationState(screen);
  };

  return (
    <View style={styles.container}>
      {/* Home Icon */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress("Home")}
      >
        <Icon
          name={navigationState === "Home" ? "home" : "home-outline"}
          size={25}
          color={navigationState === "Home" ? "white" : "#555"}
        />
      </TouchableOpacity>

      {/* Dustbin Icon */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress("Dustbin")}
      >
        <Icon
          name={navigationState === "Dustbin" ? "trash" : "trash-outline"}
          size={25}
          color={navigationState === "Dustbin" ? "white" : "#555"}
        />
      </TouchableOpacity>

      {/* Payment Icon (Currently Active) */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress("Payment")}
      >
        <Icon
          name={navigationState === "Payment" ? "card" : "card-outline"}
          size={25}
          color={navigationState === "Payment" ? "white" : "#555"}
        />
      </TouchableOpacity>

      {/* Schedule Icon */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress("Schedule")}
      >
        <Icon
          name={
            navigationState === "Schedule" ? "calendar" : "calendar-outline"
          }
          size={25}
          color={navigationState === "Schedule" ? "white" : "#555"}
        />
      </TouchableOpacity>

      {/* Profile Icon */}
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handlePress("Profile")}
      >
        <Icon
          name={navigationState === "Profile" ? "person" : "person-outline"}
          size={25}
          color={navigationState === "Profile" ? "white" : "#555"}
        />
      </TouchableOpacity>
    </View>
  );
};

// Styles for the custom navigation bar
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1DB954",
    height: 60,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  navItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomBottomNavigation;
