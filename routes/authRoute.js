const express = require('express');
const { createUser,loginUserCtrl, getAllUser,getAUser,deleteAUser,updatedAUser } = require('../controller/userCtrl');
const router = express.Router();

router.post("/register", createUser);
router.get("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/:id", getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updatedAUser);

module.exports = router;