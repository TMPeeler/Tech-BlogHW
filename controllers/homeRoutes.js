const router = require('express').Router();
// const {Comment, Post, User} = require('../../models');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const withAuth = require('../utils/auth');


router.get('/', withAuth, async (req, res)=> {
    try {
        const postData = await Post.findAll({
            
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        res.render('homepage', {
            post: posts, 
            logged_in: req.session.logged_in 
        });

    } catch (err) {
    res.status(500).json(err);
    }

});

router.get('/login', async (req, res)=> {

    res.render('login');
});

router.get('/comments', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.findAll({});
        
        const comments = commentData.map((comment) => comment.get({ plain: true }));


        res.render('comment', {
            comment: comments, 

            logged_in: req.session.logged_in 
        });

    
    } catch (err) {

        res.status(500).json(err);
    }
});
// require models


//get / root request
// get /login request


//export as router
module.exports = router;