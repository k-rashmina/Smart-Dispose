const express = require('express');
const router = express.Router();

const createController = require('../controllers/asiri/inquiryCreate');

router.post('/createInquiry', createController);

module.exports = router;