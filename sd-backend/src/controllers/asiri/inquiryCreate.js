const InquiryDetails = require('../../models/asiri/inquiryDetails');
const { v4: uuidv4 } = require('uuid');

const createInquiry = async (req,res)=>{

    const inquiryId = `INQ-${uuidv4()}`;
    const inquiryDetails = new InquiryDetails({
        inquiryId: inquiryId,
        userName: req.body.userName,
        category: req.body.category,
        description: req.body.description,
    });
    try {
        const savedInquiryDetails = await inquiryDetails.save();
        res.json({ message: "Inquiry created successfully", savedInquiryDetails });
    } catch (err) {
        res.json({ message: "Failed to create an inquiry",err });
    }
}

module.exports = createInquiry;