const express = require('express');
const passport = require('passport');
const likeController = require('../controllers/likeController');
const questionCardController = require('../controllers/questionCardController');
const shareController = require('../controllers/shareController');
const commentController = require('../controllers/commentController');

const router = express.Router();

// Route to get ALL question cards
router.get('/', questionCardController.getAllQuestionCards);

// Route to get a question card by ID
router.get('/:qc_id', questionCardController.getQuestionCardById);

// Get likes for a question card
router.get('/:qc_id/likes', likeController.getLikesByQuestionCard);

// Add a like to a question card - Requires Authentication
router.post('/:qc_id/likes', passport.authenticate('spotify', { session: false }), likeController.addLikeToQuestionCard);

// Remove a like from a question card - Requires Authentication
router.delete('/:qc_id/likes/:like_id', passport.authenticate('spotify', { session: false }), likeController.removeLikeFromQuestionCard);

// Get shares for a question card
router.get('/:qc_id/shares', shareController.getSharesByQuestionCard);

// Add a share to a question card - Requires Authentication
router.post('/:qc_id/shares', passport.authenticate('spotify', { session: false }), shareController.addShareToQuestionCard);

// Get comments for a question card
router.get('/:qc_id/comments', commentController.getCommentsByQuestionCard);

// Add a comment to a question card - Requires Authentication
router.post('/:qc_id/comments', passport.authenticate('spotify', { session: false }), commentController.addCommentToQuestionCard);

// Remove a comment from a question card - Requires Authentication
router.delete('/:qc_id/comments/:comment_id', passport.authenticate('spotify', { session: false }), commentController.deleteComment);

module.exports = router;
