const Post = require('./../models/post');

exports.getAllPosts = async (req, res, next) => {
    const posts = await Post.find({ createdBy: req.user.id });
    res.status(200).json(posts);
};

exports.postPost = async (req, res, next) => {
    const newPost = new Post(req.body);
    newPost.createdBy = req.user.id;
    try {
        const post = await newPost.save();
        res.status(201).json(post);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.getPostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        res.status(200).json(post);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.updatePost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        await Post.findByIdAndUpdate(postId, req.body);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    const { postId } = req.params;
    try {
        await Post.findOneAndDelete(postId);
        res.status(200).json({ success: true });
    } catch (error) {
        error.status = 400;
        next(error);
    }
};
