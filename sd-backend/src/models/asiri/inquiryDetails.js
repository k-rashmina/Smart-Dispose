const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inquiryDetailsSchema = new Schema({
    inquiryId: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    
});

const InquiryDetails = mongoose.model('InquiryDetails', inquiryDetailsSchema);
module.exports = InquiryDetails;