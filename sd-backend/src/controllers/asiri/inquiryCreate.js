const InquiryDetails = require('../../models/asiri/inquiryDetails');
const { v4: uuidv4 } = require('uuid');

const createInquiry = async (req,res)=>{

    const refId = `INQ-${uuidv4()}`;
    const inquiryDetails = new InquiryDetails({
        refId: refId,
        userName: req.body.userName,
        email: req.body.email,
        category: req.body.category,
        subject: req.body.subject,
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