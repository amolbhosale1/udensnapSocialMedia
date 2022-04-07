const express = require('express');
const router = express.Router();

const Post = require('../../models/PostSchema');
const User = require('../../models/UserSchema');
const authenticate = require('../../middleware/auth');
const { getPost, commentPost, deletePost, like, dislike } = require('../../controller/postController');


router.route('/').get(authenticate, getPost).post( authenticate, commentPost )

router.delete('/:id', authenticate,deletePost);

router.put('/like/:id', authenticate,like );

router.put('/unlike/:id', authenticate,dislike );

module.exports = router;