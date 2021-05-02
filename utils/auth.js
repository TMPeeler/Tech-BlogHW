const withAuth = (req, res, next) => {
    // check to see if user is logged in, if not redirect them to the login page. If they're logged in then proceed.
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;