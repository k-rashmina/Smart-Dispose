import { auth } from "../../../firebaseConfig";
import axios from "axios";
import { ConvertToUTC } from "../../utils/common/timeUtil";
import ip from "../../../ipAddress";

const PORT = 5000;

//Function to get Create Garbage Collection Record
const createGarbageCollectionRecord = async (garbageCollectionRecord) => {
  try {
    const response = await axios.post(
      `http://${ip}:${PORT}/garbageCollection/`,
      {
        garbageCollectionRecord: garbageCollectionRecord,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error saving garbage collection record:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Function to get garbage collection records of current user
const getGarbageCollectionRecords = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.get(
        `http://${ip}:${PORT}/garbageCollection/${email}`
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

//function to get the garbage collection record for the current month
const getGarbageCollectionRecordsForCurrentMonth = async () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Start and end dates for current month
  const startDateLocal = new Date(currentYear, currentMonth, 1);
  const endDateLocal = new Date(currentYear, currentMonth + 1, 0);

  // Convert start and end dates to UTC
  const startDate = ConvertToUTC(startDateLocal);
  const endDate = ConvertToUTC(endDateLocal);

  try {
    const user = auth.currentUser;
    if (user) {
      const email = user.email;
      const response = await axios.get(
        `http://${ip}:${PORT}/garbageCollection/${email}?startDate=${startDate}&endDate=${endDate}`
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

module.exports = {
  getGarbageCollectionRecords,
  getGarbageCollectionRecordsForCurrentMonth,
  createGarbageCollectionRecord,
};
