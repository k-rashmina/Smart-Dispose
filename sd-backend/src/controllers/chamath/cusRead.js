const  CustomerDetails = require("../../models/chamath/customerDetails");

const cusget = async (req, res) => {
    try {
        const readCustomer = await CustomerDetails.findById(req.params.id);
        res.status(200).json(readCustomer);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = cusget;