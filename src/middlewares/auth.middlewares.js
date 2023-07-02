export function auth(req, res, next) {
  if (req.session.logged) {
    next();
  } else {
    res.redirect("/login");
  }
}

export function isLogged(req, res, next) {
  if (req.session.logged) {
    next();
  } else {
    res.redirect("/views/login");
  }
}

export function isAdmin(req, res, next) {
  if (req.session.isAdmin === undefined) {
    res.json({ message: "You are not logged in" });
  } else {
    if (req.session.isAdmin) {
      next();
    } else {
      res.json({ message: "Not authorized" });
    }
  }
}

export function isUser(req, res, next) {
  if (req.session.isAdmin === undefined) {
    res.json({ message: "You are not logged in" });
  } else {
    if (req.session.isAdmin) {
      res.json({ message: "Not authorized" });
    } else {
      next();
    }
  }
}
