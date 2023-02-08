const express = require('express');
const router = express.Router();
const {
    createUser,
    loginUser,
    loginAdmin,
    getAllUser,
    getAUser,
    deleteAUser,
    updatedAUser,
    blockUser,
    unblockUser,
    logout,
    handleRefreshToken,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    getWishList} = require('../controller/userCtrl');
const { authMiddleWare ,isAdmin} = require('../middlewares/authMiddleware');

router.post("/register", createUser);
router.post("/forgot-password-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)

router.get("/login", loginUser);
router.get("/admin-login", loginAdmin);
router.get("/all-users", getAllUser);
router.get("/refresh",handleRefreshToken);
router.get("/single-user", authMiddleWare, isAdmin, getAUser);
router.get("/wishlist", authMiddleWare,getWishList);
router.get("/logout", logout)

router.delete("/:id",deleteAUser);
router.put("/block-user/:id", authMiddleWare, isAdmin, blockUser);
router.put("/password",authMiddleWare,updatePassword)
router.put("/unblock-user/:id",authMiddleWare,isAdmin, unblockUser);
router.put("/edit-user",authMiddleWare,isAdmin, updatedAUser);

module.exports = router;