const pointsDataAccess = require("../../data-access/yohan/pointsDataAccess");

class PointsService {
  //function for adding points to the customer
  async addPoints(email, points) {
    try {
      return await pointsDataAccess.addPoints(email, points);
    } catch (err) {
      throw new Error(`Unable to add points to ${email}: ${err.message}`);
    }
  }

  //function for getting the points of the customer
  async getPointsByEmail(email) {
    try {
      return await pointsDataAccess.getPointsByEmail(email);
    } catch (err) {
      throw new Error(`Unable to get points of ${email}: ${err.message}`);
    }
  }

  //function for updating the points of the customer
  async updatePointsByEmail(email, points) {
    try {
      return await pointsDataAccess.updatePointsByEmail(email, points);
    } catch (err) {
      throw new Error(`Unable to update points of ${email}: ${err.message}`);
    }
  }
}

module.exports = new PointsService();
