// implement your posts router here
const Post = require('./posts-model');
const express = require('express');
const router = express.Router();

// [GET] /api/posts
router.get('/', (req, res) => {
    Post.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch(() => {
        res.status(500).json({
            message: 'The posts information could not be retrieved'
        })
    })
})

// [GET] /api/posts/:id
router.get('/:id', (req, res) => {
    const { id } = req.params

    Post.findById(id)
    .then((post) => {
        if (!post) {
            res.status(404).json({ 
                message: 'The post with the specified ID does not exist'
            })
        } else {
            res.status(200).json(post)
        }
    })
    .catch(() => {
        res.status(500).json({
            message: 'The post information could not be retrieved'
        })
    })
})

// [POST] /api/posts
router.post('/', (req, res) => {
    const post = req.body

        if (!post.title || !post.contents){ 
            res.status(400).json({
                message: 'Please provide title and contents for the post'
            })
        } else {
            Post.insert(post)
            .then(() => {
                res.status(201).json(post)
            })
            .catch(() => {
                res.status(500).json({ 
                    message: 'There was an error while saving the post to the database'
                })
            })
    }
})

// [PUT] /api/posts/:id
router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    if (!changes) {
        res.status(400).json({
            message: 'Please provide title and contents for the post'
        })
        } else {
        Post.update(id, changes)
        .then(() => {
            if (!id) {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
                } else {
                res.status(200).json(changes)
            }
        })
        .catch(() => {
            res.status(404).json({
                message: 'There was an error while saving the post to the database'
            })
        })
    }
})

// [DELETE] /api/posts/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!id){ 
        res.status(404).json({ 
            message: 'The post with the specified ID does not exist'
        })
    } else {
        Post.remove(id)
        .then((post) => {
            res.status(200).json(post)
        })
        .catch(() => {
            res.status(500).json({
                message: 'The post could not be removed'
            })
        })
    }
})

// [GET] /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {
    const { id } = req.params;
    if (!id){ 
        res.status(404).json({
            message: 'The post with the specified ID does not exist'
        })
    } else {
        Post.findPostComments(id)
        .then((comments) => {
            res.status(200).json(comments)
        })
        .catch(() => {
            res.status(500).json({
                message: 'The comments information could not be retrieved'
            })
        })
    }
})

module.exports = router; 