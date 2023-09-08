const express = require("express");
const router = express.Router();
const machineController = require("../controllers/machine");

// Handle incoming data from machines
router.post("/update", machineController.updateMachine);

module.exports = router;
