// Important: DataBase connection "WE TALK TO DATABASE"
const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken"); //important: secure authentication
//Comment: register function npm i http-status-codes
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body; //Comment: from body; distructure
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide the required information" }); //Important: JSON
  }
  try {
    const [user] = await dbconnection.query(
      "select username,userId from users where username=? or email=? ",
      [username, email]
    ); //Comment: [user] select with a placeholder select index 0. we do not need the table structure

    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user is already exist" }); //Comment: Array lenght
    }
    //Comment: Medium strong
    if (password.length <= 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 character" });
    }
    //important: npm i bcrypt- Database password
    const salt = await bcrypt.genSalt(10); //Comment: Generate the randum password
    const hashPassword = await bcrypt.hash(password, salt); //Comment: insert to DataBase
    await dbconnection.query(
      "INSERT INTO users (username,firstname,lastname,email,password) values (?,?,?,?,?)",
      [username, firstname, lastname, email, hashPassword]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "user created" });
  } catch (error) {
    console.log("server error");
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong, try it again" });
  }
}
//Comment: log in function
async function login(req, res) {
  const { email, password } = req.body; //Comment: from body
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide your account or password" });
  }
  try {
    const [user] = await dbconnection.query(
      "select username, userId, password from users where email=? ",
      [email]
    ); //Comment [user] we need index 0 not the table structure

    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credetial" }); //comment: b/c of unavailable user
    }
    //Important: if user exists we need to COMPARE it but REMEMBER
    //  login cheking hashed password
    const ismatchpassword = await bcrypt.compare(password, user[0].password); //Comment: actual password VS hased password. Without [0], user would be an array, and accessing .password directly would throw an error.
    if (!ismatchpassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid password" });
    }
    //Comment: If the MATCHES !!!
    //Important: JWT (jwt.io) npm i jsonwebtoken - The server knows who have logged-in "Signed web token => <="
    const username = user[0].username;
    const userid = user[0].userId;
    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .status(StatusCodes.OK)
      .json({ msg: "user login successful", token }); //Comment: the token will be available on local storage application.Hence user can navigate in the front-end "Valid user"

    // console.log(user[0]?.userId)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: error.message });
  }
}
//Comment:The checkUser function verifies the identity of a logged-in user by extracting the username and userid from the req.user object (populated by middleware that authenticates the JWT token)
async function checkUser(req, res) {
  const username = req.user.username; //Comment:check AuthMiddleware -req.user = { username, userid }
  const userid = req.user.userid; //Comment:check AuthMiddleware- req.user = { username, userid }
  res.status(StatusCodes.OK).json({ msg: "valid user", username, userid });
}

module.exports = { register, login, checkUser };

//Warning: Why Use .json() Here:Content Type: It sets the Content-Type header of the response to application/json, indicating the data format being sent.Data Structure: It sends the data (in this case, { msg: "invalid password" }) as a JSON object, which is the standard format for APIs.Ease of Parsing: JSON responses are easy for clients (e.g., frontend applications) to parse and process.
