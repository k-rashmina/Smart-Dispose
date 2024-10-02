import React, { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../../../firebaseConfig"; // Adjust the path to your Firebase config

const UsernameDisplay = () => {
  const [username, setUsername] = useState("");

  // Get logged-in user's email from Firebase Auth
  const email = auth.currentUser?.email;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Fetch user details from the API using the email
        const response = await axios.get(
          `http://192.168.56.1:5000/customer/cusRead/${email}`
        );
        const { cusFname, cusLname } = response.data;

        // Concatenate cusFname and cusLname to form the username
        const fullName = `${cusFname} ${cusLname}`;
        setUsername(fullName); // Set the concatenated username
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, [email]);
  console.log(username);
  return username; // Return the concatenated username
};

export default UsernameDisplay;
