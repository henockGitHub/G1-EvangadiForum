//Important: Authentication Middleware "PROTECT SERVER-DATA"
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next) {
  //Comment: next handler
  const authHeader = req.headers.authorization; //Comment: authorization through header
  //Important:Clarity: It distinguishes the token type from other possible authentication schemes, such as Basic or Digest.Ease of Parsing: APIs can easily identify and process the token when it consistently starts with Bearer.
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "authentication invalid" });
  }

  const token = authHeader.split(" ")[1]; //Important to take the token with-out Bearer.

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);//Important: Signed key; not "secret" refer to .env file
    req.user = { username, userid }; //Comment: save them on req.user
    next(); //Comment authontication & token is correct so go to next; meaning ChekUser function
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "authentication invalid" });
  }
  // res.send(authHeader)
}
module.exports = authMiddleware;
