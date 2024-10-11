import { auth } from "../../../firebaseConfig";
import ip from "../../../ipAddress";
import axios from "axios";

const PORT = 5000;

//Function to Create the monthly bill for the user
const generateMonthlyBill = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.get(
        `http://${ip}:${PORT}/monthlyBill/generate/${email}`
      );
      return response.data;
    } else {
      console.error("No user is currently signed in.");
      return [];
    }
  } catch (error) {
    console.error("Error generating monthly bill:", error);
    return [];
  }
};

//Function to mark all unpaid bills as paid
const markBillsAsPaid = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.put(
        `http://${ip}:${PORT}/monthlyBill/mark-paid/${email}`
      );
      return response.data;
    } else {
      console.error("No user is currently signed in.");
      return [];
    }
  } catch (error) {
    console.error("Error marking bills as paid:", error);
    return [];
  }
};

module.exports = {
  generateMonthlyBill,
  markBillsAsPaid,
};
