const CustomerDetails = require("../../models/chamath/customerDetails");
const { deleteGarbageBins } = require("../../data-access/kalindu/garbageBinDB");

const cusDelete = async (req, res) => {
  const customerEmail = req.params.email; // Get the email from the request parameters

  try {
    // Delete the customer profile by email
    const deletedCustomer = await CustomerDetails.deleteOne({
      cusMail: customerEmail,
    });
    const message = await deleteGarbageBins(customerEmail);

    // Check if a customer was deleted
    if (deletedCustomer.deletedCount === 0) {
      return res.status(404).json({ message: "Customer not found." });
    }

    res.json({
      message: "Customer Details Deleted Successfully!",
      deletedCustomer,
    });
  } catch (error) {
    res.status(400).json({ message: "Customer Details Delete Failed", error });
  }
};

module.exports = cusDelete;
