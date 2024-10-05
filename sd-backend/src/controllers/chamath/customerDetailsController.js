const customerDetailsService = require("../../services/chamath/customerDetailsService");

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerDetailsService.getAllCustomers();
    res.status(200).json(customers);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCustomerByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const customer = await customerDetailsService.getCustomerByEmail(email);
    res.status(200).json(customer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
