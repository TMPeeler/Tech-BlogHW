const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

  router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
          where: {
            // user_id: req.params.id
            user_id: req.session.user_id,
          },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            post: posts, 
            logged_in: req.session.logged_in 
        });


        if(!postData) {
          res.status(404).json({ message: 'This user has no posts yet!'});
          return;
        }
    
        // res.status(200).json(postData);
        // where user_id = req.param.id
    
    
    } catch (err) {
      res.status(500).json(err);
    }
});

router.post('/new', async (req, res) => {
  try {

    const postData = await Post.create(req.body);
//       {
//       where: {
//         // user_id: req.params.id
//         user_id: req.session.user_id,
//       },
// }

    // const posts = postData.map((post) => post.get({ plain: true }));
    

    res.status(200).json(postData);

  } catch (err) {
    res.status(400).json(err);

  }
});



// router.get('/dashboard', withAuth, async, (req, res) => {

//     const postData = await Post.findAll({
            
//     });

//     const posts = postData.map((post) => post.get({ plain: true }));

//     res.render('dashboard', {
//         where:

//     });


// })



module.exports = router;