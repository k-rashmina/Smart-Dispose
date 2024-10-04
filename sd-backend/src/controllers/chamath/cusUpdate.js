const CustomerDetails = require("../../models/chamath/customerDetails");

const cusUpdate = async (req, res) => {
    const cusEmail = req.params.email; // Get email from request parameters

    try {
        const updatedCustomer = await CustomerDetails.updateOne(
            { cusMail: cusEmail }, // Find customer by email
            {
                $set: {
                    cusFname: req.body.cusFname,
                    cusLname: req.body.cusLname,
                    cusMail: req.body.cusMail,
                    pNum: req.body.pNum,
                    cusAddr: req.body.cusAddr,
                    cusPassword: req.body.cusPassword,
                    profilePictureUrl: req.body.profilePictureUrl,
                },
            }
        );

        if (updatedCustomer.matchedCount === 0) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.json({ message: "Customer Details Updated Successfully!", updatedCustomer });
    } catch (error) {
        res.status(400).json({ message: "Customer Details Update Failed", error });
    }
};

module.exports = cusUpdate;
