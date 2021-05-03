const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Comment, Post, User} = require('../models');

router.get('/', async (req, res)=> {
    try {
        const postData = await Post.findAll({});
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts);

        res.render('homepage', {
            post: posts, 
            // logged_in: req.session.logged_in 
        });

    } catch (err) {
    res.status(500).json(err);
    }



})
// require models


//get / root request
// get /login request


//export as router