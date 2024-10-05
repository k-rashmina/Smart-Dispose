const inquiryDetails = require("../../models/asiri/inquiryDetails");

const getAllInquiry = async (req, res) => {
  const customerEmail = req.params.email;  // Get the email from the request parameters

  try {
    // Find inquiries by the customer's email
    const inquiry = await inquiryDetails.find({ email: customerEmail });

    if (inquiry.length === 0) {
      return res.status(404).json({ message: "No inquiries found for this customer." });
    }

    res.status(200).json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = getAllInquiry;
