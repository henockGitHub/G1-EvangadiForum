//Important: organize router
const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
//  user controller
const { register, login, checkUser } = require("../Controller/userController");

// Comment: Route for registering a user: Register function
router.post("/register", register);

// Comment: Route for logging in a user: Login function
router.post("/login", login);

// Comment:Route for checking a user: CheckUser function
//Important: PROTECTED - Middleware "AuthMiddleware" through the token
router.get("/check", authMiddleware, checkUser); //Warning: We can use authMiddleware and protect any ROUTE; Qestion, Answer etc...

// Export the router module
module.exports = router;
// Comment: GET: Used to retrieve data from the server.
//Comment: POST: Used to send data to the server to create or update resources.
