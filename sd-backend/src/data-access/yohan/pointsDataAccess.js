const pointsModel = require("../../models/yohan/pointsModel");

class PointsDataAccess {
  //function for adding points to the customer
  async addPoints(email, points) {
    const newPoints = new pointsModel({
      email,
      points,
    });
    return await newPoints.save();
  }

  //function for getting the points of the customer
  async getPointsByEmail(email) {
    return await pointsModel.findOne({ email });
  }

  //function for updating the points of the customer
  async updatePointsByEmail(email, points) {
    return await pointsModel.findOneAndUpdate(
      { email },
      { points },
      { new: true }
    );
  }
}

module.exports = new PointsDataAccess();
