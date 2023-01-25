const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUserCtrl,
    getAllUser,
    getAUser,
    deleteAUser,
    updatedAUser } = require('../controller/userCtrl');
const { authMiddleWare } = require('../middlewares/authMiddleware');

router.post("/register", createUser);
router.get("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/:id",authMiddleWare, getAUser);
router.delete("/:id", deleteAUser);
router.put("/:id", updatedAUser);

module.exports = router;