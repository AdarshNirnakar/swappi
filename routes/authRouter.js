const express = require('express');
const router = express.Router();
const {registerController,loginController} = require('../controller/authController');
const {requestController} =require('../controller/workDetailsController')
const requireSignIn = require('../middlewares/authMiddleware');


router.post('/register', registerController);
router.post('/login',loginController);

router.post('/request',requestController)

module.exports = router;