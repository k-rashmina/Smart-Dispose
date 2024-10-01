const inquiryDetails = require("../../models/asiri/inquiryDetails");

const getInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryDetails.find();
    res.status(200).json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
module.exports = getInquiry;
