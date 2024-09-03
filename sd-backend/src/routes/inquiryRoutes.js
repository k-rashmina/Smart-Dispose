const express = require('express');
const router = express.Router();

const createController = require('../controllers/asiri/inquiryCreate');
const updateController = require('../controllers/asiri/inquiryUpdate');

router.post('/createInquiry', createController);
router.put('/updateInquiry/:id', updateController);

module.exports = router;