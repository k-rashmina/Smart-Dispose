const { createGarbageBin } = require("../../data-access/kalindu/garbageBinDB");

module.exports = async function createGarbageBinService(customer) {
  const customerID = customer._id;

  //creating garbage bins for the customer
  const message = await createGarbageBin(customerID);

  return message;
};
