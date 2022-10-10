function routerProtection(req, res, next) {
	if (!res.locals.isAuth) {
    return res.redirect("/401");
  } else {
		next();
	}
}

module.exports = routerProtection;