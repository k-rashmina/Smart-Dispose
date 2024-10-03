import { auth } from "../../../firebaseConfig";
import axios from "axios";

const BASE_URL = "http://192.168.1.38:5000/";

// Function to get garbage collection records of current user
const getGarbageCollectionRecords = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.get(
        `${BASE_URL}/garbageCollection/${email}`
      );
      return response.data;
    } else {
      console.error("No user is currently signed in.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching garbage collection records:", error);
    return [];
  }
};

module.exports = { getGarbageCollectionRecords };
