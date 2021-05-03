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
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

//   router.get('/dashboard', async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//           where: {
//             // user_id: req.params.id
//             user_id: req.session.user_id,
//           },

//         });
//         if(!postData) {
//           res.status(404).json({ message: 'This user has no posts yet!'});
//           return;
//         }

//         res.status(200).json(postData);
//         // where user_id = req.param.id


//     } catch (err) {
//       res.status(500).json(err);
//     }
// });

  module.exports = router;