export function auth(req, res, next) {
    if (req.session.logged) {
      next();
    } else {
      res.redirect('/');
    }
  }
  
  export function isLogged(req, res, next) {
    if (req.session.logged) {
      next()
    } else {
      res.redirect('/views/login');
    }
  }

  export function isAdmin(req, res, next) {
    if (req.session.logged && req.session.user.admin) {
      next();
    } else {
      res.redirect('/views/login');
    }
  }