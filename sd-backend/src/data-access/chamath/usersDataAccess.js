const customerDetailsModel = require("../../models/chamath/customerDetails");

class UsersDataAccess {
  //get all users
  async getAllUsers() {
    return await customerDetailsModel.find();
  }
}

module.exports = new UsersDataAccess();
