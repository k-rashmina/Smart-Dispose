import { auth } from "../../../firebaseConfig";
import ip from "../../../ipAddress";
import axios from "axios";

const PORT = 5000;

//Function to gte all customers from the database
const getAllCustomers = async () => {
  try {
    const response = await axios.get(`http://${ip}:${PORT}/customerDetails`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all customers:", error);
    return [];
  }
};

//Function to get customer by email
const getCustomerByEmail = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.get(
        `http://${ip}:${PORT}/customerDetails/${email}`
      );
      return response.data;
    } else {
      console.error("No user is currently signed in.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching customer by email:", error);
    return [];
  }
};

module.exports = {
  getAllCustomers,
  getCustomerByEmail,
};
