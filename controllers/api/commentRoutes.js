const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// "api/comments/"
router.get('/', withAuth, async (req, res) => {

    try {

        const commentData = await Comment.findAll({});

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('dashboard', {
            comment: comments, 
            logged_in: req.session.logged_in 
        });
        if(!commentData) {
            res.status(404).json({ message: 'This user has no posts yet!'});
            return;
          }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/new', withAuth, async (req, res) => {
    const newComment = {...req.body, userId: req.session.user_id}
    console.log("New Comment is ", newComment);
    try {
  
      const commentData = await Comment.create(newComment);
  
      res.status(200).json(commentData);
  
    } catch (err) {
      res.status(400).json(err);
  
    }
  });


  module.exports = router;
