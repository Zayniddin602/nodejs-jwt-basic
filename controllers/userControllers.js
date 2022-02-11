const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../model/user");


//Register User
const registerUser = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
  try {
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
}

//Login User
const checkUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          { expiresIn: "2h"}
        );
  
        // save user token
        user.token = token;
  
        // user
        return res.status(200).json(user);
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  };

module.exports = {
    registerUser,
    checkUser
}