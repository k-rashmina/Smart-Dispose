const CustomerDetails = require("../../models/chamath/customerDetails");

const cusCreate = async (req, res) => {
    

    const newCustomer = new CustomerDetails({

         cusFname : req.body.cusFname,
         cusLname : req.body.cusLname,
         cusMail : req.body.cusMail,
         pNum : req.body.pNum,
         cusAddr : req.body.cusAddr,
         cusPassword : req.body.cusPassword,
    });

    try {
        const savedCustomerDetails = await newCustomer.save();
        res.json({ message: "Customer Registered Successfully!", savedCustomerDetails });
    } catch (error) {
        res. json({ message: "Customer Registration Failed", error });
    }
}
module.exports = cusCreate;