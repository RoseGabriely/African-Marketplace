const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("./users-model");
const {
  bodyVerify,
  uniqueNameVerify,
  usernameVerify,
} = require("./users-middleware");
const tokenBuilder = require("../util/token-builder");

router.post("/register", uniqueNameVerify, bodyVerify, (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 8);

  Users.addUser({ username, password: hash })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.post("/login", bodyVerify, usernameVerify, (req, res, next) => {
  const { user } = req;
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = tokenBuilder(user);
    res.status(200).json({ message: `welcome, ${user.username}`, token });
  } else {
    next({ status: 401, message: "invalid credentials" });
  }
});

module.exports = router;
