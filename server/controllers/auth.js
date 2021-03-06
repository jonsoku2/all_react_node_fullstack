const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken"); // to generate signed token

exports.signup = async (req, res) => {
  /* validator */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    // user check
    if (user) {
      return res.status(400).json({ errors: "이미 존재하는 계정입니다." });
    }
    user = new User({
      name,
      email,
      password
    });
    // save user
    await user.save();
    // token
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
};

exports.signin = async (req, res) => {
  //find the user based on email
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user);
    // user check
    if (!user) {
      return res.status(400).json({ errors: "유저가 존재하지 않습니다." });
    }
    // if user found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({ errors: "패스워드가 일치하지 않습니다." });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, role } = user;
    res.json({ token, user: { _id, email, name, role } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error!");
  }
};

exports.registry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists!" }] });
    }
    user = new User({
      name,
      email,
      password
    });
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error!");
  }
};

exports.signout = async (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success!" });
};
