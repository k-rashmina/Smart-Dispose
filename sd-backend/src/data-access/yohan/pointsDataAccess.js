const pointsModel = require("../../models/yohan/pointsModel");

class PointsDataAccess {
  //function for adding points to the customer
  async addPoints(email, points) {
    try {
      const newPoints = new pointsModel({
        email,
        points,
      });
      return await newPoints.save();
    } catch (err) {
      console.error("Error adding points:", err.message);
      throw new Error("Unable to add points");
    }
  }

  //function for getting the points of the customer
  async getPointsByEmail(email) {
    try {
      return await pointsModel.findOne({ email });
    } catch (err) {
      console.error("Error fetching points:", err.message);
      throw new Error("Unable to fetch customer points");
    }
  }

  //function for updating the points of the customer
  async updatePointsByEmail(email, points) {
    try {
      return await pointsModel.findOneAndUpdate(
        { email },
        { points },
        { new: true }
      );
    } catch (err) {
      console.error("Error updating points:", err.message);
      throw new Error("Unable to update customer points");
    }
  }
}

module.exports = new PointsDataAccess();
