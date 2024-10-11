const inquiryDetails = require("../../models/asiri/inquiryDetails");
const updateInquiry = async (req, res) => {
  const objectid = req.params.id;

  try {
    const updatedInquiryDetails = await inquiryDetails.updateOne(
      { _id: objectid },
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          category: req.body.category,
          subject: req.body.subject,
          description: req.body.description,
        },
      }
    );
    res.json({
      message: "Inquiry updated successfully",
      updatedInquiryDetails,
    });
  } catch (err) {
    res.json({ message: "Failed to update an inquiry", err });
  }
};

module.exports = updateInquiry;
