const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inquiryDetailsSchema = new Schema({
    refId: {
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    creationDate: { type: Date, default: Date.now },
    
});

const InquiryDetails = mongoose.model('InquiryDetails', inquiryDetailsSchema);
module.exports = InquiryDetails;