const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Post, Validate} = require('../models/post');

router.get('/', async (req, res) => {
    const posts = await Post.find().sort('name');
    res.send(posts);
});


router.get('/:id', async (req, res) => {
    // let post = Post.find(p => p.id === parseInt(req.params.id));
    let post = await Post.find(req.params.id);
    if (!post) return res.status(404).send(`The Post is not found!`);
    res.send(post);
});

router.post('/', async (req, res) => {

    const { error } = Validate(req.body);
    //The New Validation in Joi Library {Schema.validate}
    if (error) return res.status(400).send(error.details[0].message);
    let post = new Post({
        name: req.body.name,
        post: req.body.post
    });

    post = await post.save();
    res.send(post);
});


router.put('/:id', async (req, res) => {

    const { error } = Validate(req.body);
    //The New Validation in Joi Library {Schema.validate}
    if (error) return res.status(400).send(error.details[0].message);

    const post = await Post.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        post: req.body.post,    
    }, {new: true });

    //Find the data is existed or not ?
    if (!post) return res.status(404).send(`The Post is not found!`);

    res.send(post);

});

router.delete('/:id', async (req, res) => {

    const post = await Post.findOneAndRemove(req.params.id);
    if (!post) return res.status(404).send(`The Post is not found!`);

    res.send(post);
});



module.exports = router;