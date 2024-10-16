const express = require('express');
const router = express.Router();

const createController = require('../controllers/asiri/inquiryCreate');
const updateController = require('../controllers/asiri/inquiryUpdate');
const getController = require('../controllers/asiri/inquiryGet');
const getOneController = require('../controllers/asiri/inquiryGetOne');
const deleteController = require('../controllers/asiri/inquiryDelete');
const inquiryReportController = require('../controllers/asiri/inquiryReport');
const getAllController = require('../controllers/asiri/inquiryGetAll')

router.post('/createInquiry', createController);
router.put('/updateInquiry/:id', updateController);
router.get('/getInquiry', getController);
router.get('/getOneInquiry/:id', getOneController);
router.delete('/deleteInquiry/:id', deleteController);
router.get('/inquiryReport', inquiryReportController);
router.get('/getAllInquiry/:email',getAllController);

module.exports = router;