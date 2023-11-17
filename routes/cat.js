const express = require("express");
const router = express.Router()

const {createCat, getCat} = require("../controllers/cat")

// create a new category

router.post("/create", createCat);

// get all category 
router.get("/", getCat)

module.exports = router;