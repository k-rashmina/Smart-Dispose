const pointsService = require("../../services/yohan/pointsService");

exports.addPoints = async (req, res) => {
  try {
    const { email, points } = req.body;
    const customerPoints = await pointsService.addPoints(email, points);
    res.status(200).json(customerPoints);
  } catch (err) {
    res.status(500).json({ error: "Unable to add points" });
  }
};

exports.getPointsByEmail = async (req, res) => {
  try {
    const customerPoints = await pointsService.getPointsByEmail(
      req.params.email
    );
    if (!customerPoints) {
      res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customerPoints);
  } catch (err) {
    res.status(500).json({ error: "Unable to get points" });
  }
};

exports.updatePointsByEmial = async (req, res) => {
  try {
    const { points } = req.body;
    const customerPoints = await pointsService.updatePointsByEmail(
      req.params.email,
      points
    );
    if (!customerPoints) {
      res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customerPoints);
  } catch (err) {
    res.status(500).json({ error: "Unable to update points" });
  }
};
