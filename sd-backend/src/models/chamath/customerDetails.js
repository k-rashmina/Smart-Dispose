const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerDetailsSchema = new schema({
    cusFname:{
        type: String,
        required: true,
        
    },

    cusLname:{

        type: String,
        required: true,
        
    },

    cusMail:{
        type: String,
        required: true,
        

    },

    pNum:{
        type: Number,
        required: true,
        
    },

    cusAddr:{
        type: String,
        required: true,
        
    },

    cusPassword:{
        type: String,
        required: true,
        
    },

});

const customerDetails = mongoose.model(
    "customerProfile",
    customerDetailsSchema
);

module.exports = customerDetails;