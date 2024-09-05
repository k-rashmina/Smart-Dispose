const CustomerDetails = require("../../models/chamath/customerDetails");


const cusDelete = async (req, res) => {

    const cusId = req.params.id;

    try {

        const deletedCustomer = await CustomerDetails.deleteOne({ _id: cusId });
        res.json({ message: "Customer Details Deleted Successfully!", deletedCustomer });
}

    catch (error) {
        res.json({ message: "Customer Details Delete Failed", error });
    }
};

module.exports = cusDelete;