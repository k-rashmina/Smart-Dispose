const inquiryDetails = require("../../models/asiri/inquiryDetails");

const deleteInquiry = async (req, res) => {
    const objectid = req.params.id;
    
    try {
        const deletedInquiryDetails = await inquiryDetails.deleteOne({
        _id: objectid,
        });
        res.json({
        message: "Inquiry deleted successfully",
        deletedInquiryDetails,
        });
    } catch (err) {
        res.json({ message: "Failed to delete an inquiry", err });
    }
    };

module.exports = deleteInquiry;