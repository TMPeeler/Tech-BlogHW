const router = require('express').Router();
const { User, Post } = require('../../models');
// login route
//logout route 
// new account route

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        console.log('new user created');
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });


      console.log(userData, 'login details!');


      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //post request for logout that destroys session
router.post('/logout', async (req, res) => {

    if(req.session.logged_in === true) {
      req.session.destroy(() => {
        res.status(204).end();
      });
      res.redirect('/');
    } else {
      res.status(404).end();

    }


});

  module.exports = router;