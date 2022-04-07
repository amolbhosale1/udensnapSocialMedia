const asyncHandler = require('express-async-handler')

const Post = require('../models/PostSchema')
const User = require('../models/UserSchema')

const getPost = asyncHandler(async (req, res) => {
    const post = await Post.find().sort({ timestamps: -1 });
    res.send(post);
})

const commentPost = asyncHandler(async (req, res) => {

    const user = await User.findOne({ user: req.rootUser.id });
    const newPost = await new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avator,
        user: req.rootUser.id
    });

    const post = await newPost.save();
    res.send(post);
})

const deletePost= asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    await post.remove();
    res.send({ msg: 'Post removed' });
});

const like = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    
    if(post.likes.some((like) => like.user.toString() === req.rootUser.id)){
        return res.status(501).send({msg:"Already Like"})
    };
    post.likes.unshift({ user: req.rootUser.id });
    await post.save();
    res.send({msg:"Post Like"});
})

const dislike=asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post.likes.some((like) => like.user.toString() === req.rootUser.id)){
        return res.status(501).send({msg:"Already UnLike"})
    };

    post.likes = post.likes.filter(
        ({ user }) => user.toString() !== req.rootUser.id
    );
    await post.save();
    res.send({msg:"Post Unlike"});

})

module.exports = {
    getPost, commentPost,deletePost,like,dislike
}