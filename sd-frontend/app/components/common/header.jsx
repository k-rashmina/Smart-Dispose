import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons

const Header = () => {
  const [profileImageUri, setProfileImageUri] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton}>
          {/* Using Ionicons for the back arrow */}
          <Ionicons name="arrow-back" size={30} color="#1DB954" />
        </TouchableOpacity>
        <Text style={styles.title}>Pay Bill</Text>
        <TouchableOpacity style={styles.profileImageButton}>
          <Image
            source={
              profileImageUri
                ? { uri: profileImageUri }
                : {
                    uri: "https://media.istockphoto.com/id/2042526830/photo/successful-businesswoman-using-laptop-working-in-office-business-technology-corporate-concept.jpg?s=2048x2048&w=is&k=20&c=0fFaJhRPwTG5mfo2w-7nRDJ-rhDfqZ2lWiymwMKz63k=",
                  }
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  goBackButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Header;
