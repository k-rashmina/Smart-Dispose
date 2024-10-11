const CustomerDetails = require("../../models/chamath/customerDetails");
const createGarbageBinService = require("../../services/kalindu/createGarbageBinService");
const pointsService = require("../../services/yohan/pointsService");

const cusCreate = async (req, res) => {
  const newCustomer = new CustomerDetails({
    cusFname: req.body.cusFname,
    cusLname: req.body.cusLname,
    cusMail: req.body.cusMail,
    pNum: req.body.pNum,
    cusAddr: req.body.cusAddr,
    cusPassword: req.body.cusPassword,
    profilePictureUrl: req.body.profilePictureUrl,
  });

  try {
    const savedCustomerDetails = await newCustomer.save();

    // Add new customer to the points collection
    await pointsService.addPoints(savedCustomerDetails.cusMail, 0);

    const msg = await createGarbageBinService(savedCustomerDetails);
    // console.log(msg);
    if (msg == "Bins Added") {
      res.json({
        message: "Customer Registered Successfully!",
        savedCustomerDetails,
      });
    }
  } catch (error) {
    res.json({ message: "Customer Registration Failed", error });
  }
};
module.exports = cusCreate;
