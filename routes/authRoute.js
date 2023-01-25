const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUserCtrl,
    getAllUser,
    getAUser,
    deleteAUser,
    updatedAUser } = require('../controller/userCtrl');
const { authMiddleWare ,isAdmin} = require('../middlewares/authMiddleware');

router.post("/register", createUser);
router.get("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/single-user",authMiddleWare,isAdmin, getAUser);
router.delete("/:id",deleteAUser);
router.put("/edit-user",authMiddleWare, updatedAUser);

module.exports = router;