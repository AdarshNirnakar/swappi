const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../controller/authController');
const { requestController, getAllRequestsController, deleteRequestController } = require('../controller/workDetailsController'); 
const requireSignIn = require('../middlewares/authMiddleware'); 

// Route for user registration
router.post('/register', registerController);

// Route for user login
router.post('/login', loginController);

// Route for handling requests
router.post('/request', requestController); 

// Route to see all the requests
router.get('/requests', getAllRequestsController);

// Route to delete a request
router.delete('/request/:id', deleteRequestController);

module.exports = router;
