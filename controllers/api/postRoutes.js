const router = require('express').Router();
const { Post } = require('../../models');

  router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
          where: {
            // user_id: req.params.id
            user_id: req.session.user_id,
          },

        });
        if(!postData) {
          res.status(404).json({ message: 'This user has no posts yet!'});
          return;
        }

        res.status(200).json(postData);
        // where user_id = req.param.id


    } catch (err) {
      res.status(500).json(err);
    }
});




module.exports = router;