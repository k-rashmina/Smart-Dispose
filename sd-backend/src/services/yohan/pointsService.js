const pointsDataAccess = require("../../data-access/yohan/pointsDataAccess");

class PointsService {
  //function for adding points to the customer
  async addPoints(email, points) {
    try {
      return await pointsDataAccess.addPoints(email, points);
    } catch (err) {
      console.error("Error adding points:", err.message);
      throw new Error("Unable to add points");
    }
  }

  //function for getting the points of the customer
  async getPointsByEmail(email) {
    try {
      return await pointsDataAccess.getPointsByEmail(email);
    } catch (err) {
      console.error("Error fetching points:", err.message);
      throw new Error("Unable to fetch customer points");
    }
  }

  //function for updating the points of the customer
  async updatePointsByEmail(email, points) {
    try {
      return await pointsDataAccess.updatePointsByEmail(email, points);
    } catch (err) {
      console.error("Error updating points:", err.message);
      throw new Error("Unable to update customer points");
    }
  }
}

module.exports = new PointsService();
