const express = require('express');
const postRoutes = express.Router();

// Require Post model in our routes module
let Post = require('./post.model');

// Defined store route
postRoutes.route('/add').post(function (req, res) {
    let post = new Post(req.body);
    post.save()
        .then(() => {
            res.status(200).json({ 'result': 'result is added successfully' });
        })
        .catch(() => {
            res.status(400).send("unable to save to database");
        });
});

// Defined get data(index or listing) route
postRoutes.route('/').get(function (req, res) {
    Post.find(function (err, posts) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(posts);
        }
    });
});

module.exports = postRoutes;