const express = require ("express")
const router = express.Router();
const {displayWelcome, displayDash, register, signin} = require("../controllers/user.controller")


router.get("/", displayWelcome);
router.get("/dash", displayDash); 
router.post("/register" , register);
router.post("/login" , signin  )

module.exports = router;