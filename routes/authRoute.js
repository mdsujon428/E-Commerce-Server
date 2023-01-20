const express = require('express');
const { createUser,loginUserCtrl, getAllUser } = require('../controller/userCtrl');
const router = express.Router();

router.post("/register", createUser);
router.get("/login", loginUserCtrl);
router.get("/all-users", getAllUser);

module.exports = router;