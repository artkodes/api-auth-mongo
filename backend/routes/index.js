var express = require("express");
var router = express.Router();
var uid2 = require("uid2");
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
require("../utils/db");

var userModel = require("../models/user");

router.post("/sign-up", async function(req, res, next) {
  const { firstname, lastname, email, password } = req.body;
  const error = {};

  const user = await userModel.findOne({
    email
  });

  if (user != null) {
    error.message = "utilisateur déjà présent";
    return res.json({ error });
  }

  const salt = uid2(32);
  const newUser = new userModel({
    lastname,
    firstname,
    email,
    password: SHA256(password + salt).toString(encBase64),
    salt
  });

  await newUser.save();
  const userLog = await userModel.findOne({
    email
  });

  return res.status(200).json({ user: userLog });
});

router.post("/login", async function(req, res, next) {
  const { email, password } = req.body;
  const error = [];

  const user = await userModel.findOne({
    email
  });

  console.log("body", req.body);

  if (user == null) {
    error.push("utilisateur inconu");
    return res.json({ error });
  }

  const pw = SHA256(password + user.salt).toString(encBase64);
  if (pw == user.password) {
    return res.status(200).json({ user });
  } else {
    return res.json({ message: "mot de passe incorrect" });
  }
});

module.exports = router;
