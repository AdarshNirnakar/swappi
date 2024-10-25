const express = require('express');
const router = express.Router();
const {registerController,loginController,testController,requestController} = require('../controller/authController');
const requireSignIn = require('../middlewares/authMiddleware');


router.post('/register', registerController);
router.post('/login',loginController);
router.get('/test',requireSignIn,testController)
router.post('/request',requestController)

module.exports = router;