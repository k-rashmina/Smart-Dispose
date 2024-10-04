import { getGarbageCollectionRecordsForLastMonth } from "./garbageCollectionClient";
import { auth } from "../../../firebaseConfig";
import ip from "../../../ipAddress";
import axios from "axios";

const PORT = 5000;

//Function to Create the monthly bill for the user
// const generateMonthlyBill = async () => {
//   try {
//     const records = await getGarbageCollectionRecordsForLastMonth();
//     const user = auth.currentUser;

//     if (user && records.length > 0) {
//       const response = await axios.post(`http://${ip}:${PORT}/calculateBill`, {
//         records: records,
//       });
//       return response.data;
//     } else {
//       console.error(
//         "No user is currently signed in or no garbage collection records found."
//       );
//       return [];
//     }
//   } catch (error) {
//     console.error("Error generating monthly bill:", error);
//     return [];
//   }
// };

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

module.exports = {
  generateMonthlyBill,
};
