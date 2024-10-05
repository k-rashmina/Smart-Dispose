const monthlyBillDataAccess = require("../../data-access/../data-access/yohan/monthlyBillDataAccess");
const garbageCollectionDataAccess = require("../../data-access/yohan/garbageCollectionDataAccess");
const PointsDataAccess = require("../../data-access/yohan/pointsDataAccess");
const usersDataAccess = require("../../data-access/chamath/usersDataAccess");
const { ConvertToUTC, ConvertTimeToUTC } = require("../../utils/timeUtil");
const { CalculatePoints } = require("../../utils/pointsUtil");
const cron = require("node-cron");

class MonthlyBillService {
  // Define the cost or payback for each garbage type
  static ORGANIC_COST = 100; // Cost per kg for Organic waste
  static NON_ORGANIC_COST = 150; // Cost per kg for Non-organic waste
  static POLYTHENE_PLASTIC_COST = 200; // Cost per kg for Polythene-plastic waste
  static RECYCLABLE_PAYBACK = -100; // Payback per kg for Recyclable waste (negative value means payback)

  // Function to generate monthly bill
  async generateMonthlyBill(email) {
    console.log("Generating monthly bill for:", email); // Log the email

    try {
      // Get current date, month, and year
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      // Adjust the year if last month is December
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;

      // Start and end dates for last month
      const startDateLocal = new Date(lastMonthYear, lastMonth, 1);
      const endDateLocal = new Date(currentYear, currentMonth, 0);

      // Convert start and end dates to UTC
      const startDate = ConvertToUTC(startDateLocal);
      const endDate = ConvertToUTC(endDateLocal);

      // Step 1: Check if monthly bill already exists for the given email and date range
      const existingMonthlyBill =
        await monthlyBillDataAccess.getexistingMonthlyBillsByEmailAndDateRange(
          email,
          startDate,
          endDate
        );

      // If monthly bill already exists, return the existing bill
      if (existingMonthlyBill) {
        console.log(
          `Bill already exists for email: ${email} for the date range ${startDate} to ${endDate}.`
        );
        if (existingMonthlyBill.status) {
          console.log("Bill is already paid.");
          return true;
        } else {
          console.log("Bill is not paid.");
          return existingMonthlyBill;
        }
      }

      // Step 2: Get all unpaid bills to calculate total outstanding amount
      const unpaidBills =
        await monthlyBillDataAccess.getUnpaidMonthlyBillsByEmail(email);

      let totalOutstandingAmount = 0;
      unpaidBills.forEach((bill) => {
        totalOutstandingAmount += bill.monthlyCharge;
      });

      console.log(
        `Total outstanding amount for ${email}: ${totalOutstandingAmount}`
      );

      // Step 3: Get garbage collection records for the date range
      const garbageCollectionRecords =
        await garbageCollectionDataAccess.getGarbageCollectionByDateRange(
          email,
          startDate,
          endDate
        );

      // If no records found, log and return
      if (garbageCollectionRecords.length === 0) {
        console.log(
          `No garbage collection records found for ${email} for the date range ${startDate} to ${endDate}.`
        );
        return;
      }

      // Calculate total weight of each type of garbage
      const totalWeights = {};

      garbageCollectionRecords.forEach((record) => {
        const { garbageType, weight } = record;

        // Initialize garbage type if not already present
        if (!totalWeights[garbageType]) {
          totalWeights[garbageType] = 0;
        }

        // Add weight to total weight
        totalWeights[garbageType] += weight;
      });

      // Step 4: Calculate individual costs using class constants
      const totalCostForOrganic =
        totalWeights["Organic"] * MonthlyBillService.ORGANIC_COST || 0;
      const totalCostForNonOrganic =
        totalWeights["Non-organic"] * MonthlyBillService.NON_ORGANIC_COST || 0;
      const totalCostForPolythenePlastic =
        totalWeights["Polythene-plastic"] *
          MonthlyBillService.POLYTHENE_PLASTIC_COST || 0;

      // Step 5: Calculate sub-total cost, tax, and service charge
      const subTotalCost =
        totalCostForOrganic +
        totalCostForNonOrganic +
        totalCostForPolythenePlastic;
      const tax = subTotalCost * 0.075;
      const serviceCharge = 500.0;

      // Step 6: Calculate total cost (excluding outstanding)
      const totalCost = subTotalCost + tax + serviceCharge;

      // Step 7: Calculate total payback for recyclable waste
      const totalPaybackForRecyclable =
        totalWeights["Recyclable"] * MonthlyBillService.RECYCLABLE_PAYBACK || 0;

      // Step 8: Calculate monthly charge (without outstanding amount)
      const monthlyCharge = totalCost + totalPaybackForRecyclable;

      // Step 9: Update user points based on polythene production
      const polytheneProductionWeight = totalWeights["Polythene-plastic"] || 0;
      const currentPoints = await PointsDataAccess.getPointsByEmail(email);

      console.log("Current points:", currentPoints.points);
      console.log("Polythene production weight:", polytheneProductionWeight);

      const updatedPoints = CalculatePoints(
        currentPoints.points,
        polytheneProductionWeight
      );

      // Update the points in the database
      await PointsDataAccess.updatePointsByEmail(email, updatedPoints);

      // Console log the updated points
      const updatedPointsData = await PointsDataAccess.getPointsByEmail(email);
      console.log(`Updated points for ${email}: ${updatedPointsData.points}`);

      // Step 10: Create monthly bill object
      const monthlyBill = {
        email,
        startDate,
        endDate,
        totalCostForOrganic,
        totalCostForNonOrganic,
        totalCostForPolythenePlastic,
        subTotalCost,
        tax,
        serviceCharge,
        totalCost,
        totalPaybackForRecyclable,
        monthlyCharge,
        totalOutstandingAmount,
        status: false,
      };

      // Step 11: Save monthly bill
      return await monthlyBillDataAccess.saveMonthlyBill(monthlyBill);
    } catch (error) {
      throw new Error(`Unable to generate monthly bill: ${error.message}`);
    }
  }

  // New function to generate bills for all users
  async generateMonthlyBillsForAllUsers() {
    try {
      // Fetch all users' emails
      const users = await usersDataAccess.getAllUsers();
      console.log("Fetched users:", users); // Log the fetched users for debugging
      const userEmails = users.map((user) => user.cusMail);

      // Generate a bill for each user
      for (const email of userEmails) {
        console.log("Generating bill for email:", email); // Log each email being processed
        await this.generateMonthlyBill(email);
      }

      console.log("Monthly bills generated for all users.");
    } catch (error) {
      throw new Error(
        `Unable to generate monthly bills for all users: ${error.message}`
      );
    }
  }

  // Schedule the bill generation task using UTC conversion
  async scheduleMonthlyBillGeneration() {
    const now = new Date();
    const localDateTime = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0);
    const utcDateTime = ConvertTimeToUTC(localDateTime);

    const utcHour = utcDateTime.getUTCHours();
    const utcMinute = utcDateTime.getUTCMinutes();

    // Schedule cron task using the converted UTC time
    cron.schedule(`${utcMinute} ${utcHour} 1 * *`, async () => {
      console.log("Running monthly billing task at", new Date().toISOString());
      const billService = new MonthlyBillService();
      await billService.generateMonthlyBillsForAllUsers();
    });

    console.log(
      `Scheduled task for ${utcHour}:${utcMinute} UTC on the 1st of each month.`
    );
  }

  // Function to mark all unpaid bills as paid for a specific email
  async markBillsAsPaid(email) {
    try {
      const unpaidBills =
        await monthlyBillDataAccess.getUnpaidMonthlyBillsByEmail(email);

      const updatePromises = unpaidBills.map(async (bill) => {
        bill.status = true;
        return await monthlyBillDataAccess.updateMonthlyBill(bill);
      });

      await Promise.all(updatePromises);

      console.log(`All unpaid bills for ${email} have been marked as paid.`);
      return true;
    } catch (error) {
      throw new Error(`Unable to mark bills as paid: ${error.message}`);
    }
  }
}

module.exports = new MonthlyBillService();
