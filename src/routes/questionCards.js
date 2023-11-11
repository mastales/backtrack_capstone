const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

// Get likes for a question card
router.get('/:qc_id/likes', likeController.getLikesByQuestionCard);

// Add a like to a question card
router.post('/:qc_id/likes', likeController.addLikeToQuestionCard);

// Route to remove a like
router.delete('/likes/:like_id', likeController.removeLikeFromQuestionCard);

// Get shares for a question card
router.get('/:qc_id/shares', shareController.getSharesByQuestionCard);

// Add a share to a question card
router.post('/:qc_id/shares', shareController.addShareToQuestionCard);

// Get comments for a question card
router.get('/:qc_id/comments', commentController.getCommentsByQuestionCard);

// Add a comment to a question card
router.post('/:qc_id/comments', commentController.addCommentToQuestionCard);

// Route to post a comment with song data to a question card
router.post('/:qc_id/comments', commentController.postCommentWithSong);

// Route to get a question card by ID
router.get('/:qc_id', questionCardController.getQuestionCardById);

module.exports = router;
