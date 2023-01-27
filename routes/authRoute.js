const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUserCtrl,
    getAllUser,
    getAUser,
    deleteAUser,
    updatedAUser,
    blockUser,
    unblockUser,
    handleRefreshToken} = require('../controller/userCtrl');
const { authMiddleWare ,isAdmin} = require('../middlewares/authMiddleware');

router.post("/register", createUser);
router.get("/login", loginUserCtrl);
router.get("/all-users", getAllUser);
router.get("/refresh",handleRefreshToken);
router.delete("/:id",deleteAUser);
router.get("/single-user",authMiddleWare,isAdmin, getAUser);
router.put("/block-user/:id",authMiddleWare,isAdmin, blockUser);
router.put("/unblock-user/:id",authMiddleWare,isAdmin, unblockUser);
router.put("/edit-user",authMiddleWare,isAdmin, updatedAUser);

module.exports = router;