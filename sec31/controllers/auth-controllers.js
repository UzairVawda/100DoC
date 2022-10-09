const bcrypt = require("bcryptjs");
const User = require("../models/user");
const validateSession = require("../util/validation-session");
const validateForm = require("../util/validation-form");

function getHome(req, res) {
  sessionInputData = validateSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
  });

  res.render("signup", {
    inputData: sessionInputData,
  });
}

function getLogin(req, res) {
  sessionInputData = validateSession.getSessionErrorData(req, {
    email: "",
    password: "",
  });

  res.render("login", {
    inputData: sessionInputData,
  });
}

async function userSignup(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData['email']
  const enteredConfirmEmail = userData["confirm-email"];
  const enteredPassword = userData.password;

  if (
    !validateForm.userIsValid(
      enteredEmail,
      enteredConfirmEmail,
      enteredPassword
    )
  ) {
    validateSession.flashSessionErrors(
      req,
      {
        message: "Invalid input - please check your data.",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      res.redirect("/signup")
    );
    return;
  }
	const newUser = new User(enteredEmail, enteredPassword)
  const existingUser = await newUser.userExists();

  if (existingUser) {
    validateSession.flashSessionErrors(
      req,
      {
        message: "User exists already!",
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      },
      res.redirect("/signup")
    );
    return;
  }

	await newUser.signUp();
  res.redirect("/login");
}

async function userLogin(req, res) {
  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;

	const newUser = new User(enteredEmail, enteredPassword)
	const existingUser = await newUser.getUserByEmail()

  if (!existingUser) {
		console.log('UserDoesntExists')
    validateSession.flashSessionErrors(
			req,
      {
				message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      res.redirect("/login")
			);
			
			return;
		}
		
		const passwordsAreEqual = await newUser.login(existingUser.password)

		console.log(passwordsAreEqual)
		if (!passwordsAreEqual) {
		console.log('PassDontMatch')
    validateSession.flashSessionErrors(
      req,
      {
        message: "Could not log you in - please check your credentials!",
        email: enteredEmail,
        password: enteredPassword,
      },
      res.redirect("/login")
    );
    return;
  }

  req.session.user = { id: existingUser._id, email: existingUser.email };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
}

function userLogout(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
}

module.exports = {
  getHome: getHome,
  getLogin: getLogin,
  userSignup: userSignup,
  userLogin: userLogin,
  userLogout: userLogout,
};
