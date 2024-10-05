const customerDetailsDataAccess = require("../../data-access/chamath/usersDataAccess");

class CustomerDetailsService {
  // Get all customers
  async getAllCustomers() {
    try {
      return await customerDetailsDataAccess.getAllUsers();
    } catch (err) {
      throw new Error(`Unable to get all customers: ${err.message}`);
    }
  }

  // Get customer by email
  async getCustomerByEmail(email) {
    try {
      return await customerDetailsDataAccess.getUserByMail(email);
    } catch (err) {
      throw new Error(
        `Unable to get customer with email ${email}: ${err.message}`
      );
    }
  }
}

module.exports = new CustomerDetailsService();
