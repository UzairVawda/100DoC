const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.tempUserInput;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }
  req.session.tempUserInput = null;

  res.render("signup", { tempData: sessionInputData });
});

router.get("/login", function (req, res) {
  let sessionInputData = req.session.tempUserInput;
  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      password: "",
    };
  }
  req.session.tempUserInput = null;

  res.render("login", { tempData: sessionInputData });
});

router.post("/signup", async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredConfirmEmail = req.body["confirm-email"];
  const enteredPassword = req.body.password;
  const hashedPass = await bcrypt.hash(enteredPassword, 12);

  if (
    !enteredEmail ||
    !enteredConfirmEmail ||
    !enteredPassword ||
    enteredPassword.trim() < 8 ||
    enteredEmail !== enteredConfirmEmail ||
    !enteredEmail.includes("@")
  ) {
    req.session.tempUserInput = {
      hasError: true,
      message: "Invalid Input - please chck your data",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      return res.redirect("/signup");
    });
    return; // quit the entire function or else you will get headers error
  }

  const exisitingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (exisitingUser) {
    req.session.tempUserInput = {
      hasError: true,
      message: "User Already Exists!",
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/signup");
    })
    return
  }
  const user = {
    email: enteredEmail,
    password: hashedPass,
  };

  await db.getDb().collection("users").insertOne(user);
  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;
  const exisitingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enteredEmail });

  if (!exisitingUser) {
    req.session.tempUserInput = {
      hasError: true,
      message: "Could not login - check credentials!",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    })
    return 
  }

  const passEqual = await bcrypt.compare(
    enteredPassword,
    exisitingUser.password
  );

  if (!passEqual) {
    req.session.tempUserInput = {
      hasError: true,
      message: "Incorrect Password",
      email: enteredEmail,
      password: enteredPassword,
    };
    req.session.save(function () {
      res.redirect("/login");
    })
    return 
  }

  req.session.user = { id: exisitingUser._id, email: exisitingUser.email };
  req.session.isAuthenticated = true;

  req.session.save(function () {
    res.redirect("/admin");
  });
});

router.get("/admin", async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }
  const user = await db.getDb().collection('users').findOne({_id: req.session.user.id})
  if (!user || !user.isAdmin) {
    return res.status(403).render("403");
  }
  res.render("admin");
});

router.get("/profile", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
