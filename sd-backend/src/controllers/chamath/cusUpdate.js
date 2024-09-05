const CustomerDetails = require("../../models/chamath/customerDetails");

const cusUpdate = async (req, res) => {
    const cusId = req.params.id;

    try{

        const updatedCustomer = await CustomerDetails. updateOne(
            { _id: cusId },
            {
                $set: {
                    cusFname : req.body.cusFname,
                    cusLname : req.body.cusLname,
                    cusMail : req.body.cusMail,
                    pNum : req.body.pNum,
                    cusAddr : req.body.cusAddr,
                    cusPassword : req.body.cusPassword,
                },
            });

            res.json({ message: "Customer Details Updated Successfully!", updatedCustomer });
    }
    catch (error) {
        res.json({ message: "Customer Details Update Failed", error });
    }
};

module.exports = cusUpdate; 