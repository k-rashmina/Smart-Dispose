import { auth } from "../../../firebaseConfig";
import ip from "../../../ipAddress";
import axios from "axios";

const PORT = 5000;

// Function to get customer points of current user
const getCustomerPoints = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.get(`http://${ip}:${PORT}/points/${email}`);
      return response.data;
    } else {
      console.error("No user is currently signed in.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching customer points:", error);
    return [];
  }
};

// Function to update customer points of current user
const updateCustomerPoints = async (points) => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.put(`http://${ip}:${PORT}/points/${email}`, {
        points,
      });
      return response.data;
    } else {
      console.error("No user is currently signed in.");
      return [];
    }
  } catch (error) {
    console.error("Error updating customer points:", error);
    return [];
  }
};
module.exports = { getCustomerPoints, updateCustomerPoints };
