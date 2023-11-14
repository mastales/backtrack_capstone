const express = require('express');
const likeController = require('../controllers/likeController');
const questionCardController = require('../controllers/questionCardController');
const shareController = require('../controllers/shareController');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Route to get a question card by ID
router.get('/:qc_id', questionCardController.getQuestionCardById); //DONE ✅

// Get likes for a question card
router.get('/:qc_id/likes', likeController.getLikesByQuestionCard); //DONE ✅

// Add a like to a question card
router.post('/:qc_id/likes', likeController.addLikeToQuestionCard); //DONE ✅

// Remove a like from a question card
router.delete('/:qc_id/likes/:like_id', likeController.removeLikeFromQuestionCard); //DONE ✅

// Get shares for a question card
router.get('/:qc_id/shares', shareController.getSharesByQuestionCard); //DONE ✅

// Add a share to a question card
router.post('/:qc_id/shares', shareController.addShareToQuestionCard); //DONE ✅

// Get comments for a question card
router.get('/:qc_id/comments', commentController.getCommentsByQuestionCard);

// Add a comment to a question card
router.post('/:qc_id/comments', commentController.addCommentToQuestionCard);

// // Remove a comment from a question card
// router.delete('/:qc_id/comments/:comment_id', commentController.removeCommentFromQuestionCard);

// Route to post a comment with song data to a question card
router.post('/:qc_id/comments', commentController.postCommentWithSong);


module.exports = router;
