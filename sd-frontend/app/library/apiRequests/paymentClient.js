import { auth } from "../../../firebaseConfig";
import axios from "axios";
import ip from "../../../ipAddress";

const PORT = 5000;

// Function to save payment
const savePayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `http://${ip}:${PORT}/payments/save`,
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error saving payment:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to get payment by email
const getPaymentByEmail = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.get(
        `http://${ip}:${PORT}/payments/${email}`
      );
      return response.data;
    } else {
      console.error("No user is currently signed in.");
      return [];
    }
  } catch (error) {
    console.error(
      "Error getting payment by email:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = { savePayment, getPaymentByEmail };
