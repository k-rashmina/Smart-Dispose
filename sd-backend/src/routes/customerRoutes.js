const express = require('express');
const router = express.Router();


const cusCreateCon = require('../controllers/chamath/cusCreate');
const cusUpdateCon = require('../controllers/chamath/cusUpdate');
const cusReadCon = require('../controllers/chamath/cusRead');
const cusDeleteCon = require('../controllers/chamath/cusDelete'); 
const customerReportController = require('../controllers/chamath/customerReport'); 






router.post('/cusCreate', cusCreateCon);
router.put('/cusUpdate/:email', cusUpdateCon);
router.get('/cusRead/:email', cusReadCon);
router.delete('/cusDelete/:email', cusDeleteCon);
router.get('/customerReport', customerReportController);







module.exports = router;