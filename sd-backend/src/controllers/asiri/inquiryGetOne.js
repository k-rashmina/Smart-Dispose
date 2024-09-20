const inquiryDetails = require("../../models/asiri/inquiryDetails");

const getOneInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryDetails.findById(req.params.id);
    res.status(200).json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

module.exports = getOneInquiry;
