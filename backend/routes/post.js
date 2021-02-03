const express = require('express');
const router = express.Router();

const postController = require('./../controllers/post');

router.route('/')
    .get(postController.getAllPosts)
    .post(postController.postPost);

router.route('/:postId')
    .get(postController.getPostById)
    .put(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;