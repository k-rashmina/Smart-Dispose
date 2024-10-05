const customerDetailsModel = require("../../models/chamath/customerDetails");

class UsersDataAccess {
  //get all customers
  async getAllUsers() {
    return await customerDetailsModel.find();
  }

  //get customer by email
  async getUserByMail(email) {
    return await customerDetailsModel.findOne({ cusMail: email });
  }
}

module.exports = new UsersDataAccess();
