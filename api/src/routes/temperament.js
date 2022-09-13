const { Router } = require("express");
const {Temperament} = require('../db');
const axios= require('axios');
const router = Router();
const {getTemperaments}= require('../controllers/controllers')

//TODO: get all temperaments


router.get("/", getTemperaments);
module.exports = router;




module.exports = router;