const knex = require('../../db');
const passport = require('passport');

// Controller for comments

// Get all comments for a question card
const getCommentsByQuestionCard = async (req, res) => {
  const { qc_id } = req.params;

  try {
    // First, check if the question card exists
    const cardExists = await knex('question_cards').where('qc_id', qc_id).first();
    if (!cardExists) {
      return res.status(404).send('Question card not found');
    }

    // If the question card exists, fetch comments and join with the users table
    const comments = await knex('comments')
      .join('users', 'comments.user_id', 'users.user_id')
      .where('comments.qc_id', qc_id)
      .select(
        'comments.comment_id',
        'comments.content',
        'comments.comment_date',
        'comments.track_name',
        'comments.artist_name',
        'comments.track_url',
        'comments.track_image_url',
        'users.username',
        'users.profile_picture_url'
      );

    res.json({
      id: qc_id,
      comments: comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('An error occurred while fetching comments.');
  }
};

const addCommentToQuestionCard = async (req, res) => {
  const { qc_id } = req.params;
  const { content, track_name, artist_name, track_url, track_image_url } = req.body;
 
  // Check if the authenticated user's ID is available
 if (!req.user || !req.user.user_id) {
  return res.status(401).send('Unauthorized: User not authenticated');
  }
const user_id = req.user.user_id;
  
  try {
    // Check if the question card exists
    const cardExists = await knex('question_cards').where('qc_id', qc_id).first();
    if (!cardExists) {
      return res.status(404).send('Question card not found');
    }

    // If the question card exists, proceed to add the comment
    const [newCommentId] = await knex('comments').insert({
      qc_id,
      user_id,
      content,
      track_name,
      artist_name,
      track_url,
      track_image_url
    });

    res.status(201).json({
      message: 'Comment added successfully',
      comment: {
        comment_id: newCommentId,
        qc_id,
        user_id,
        content,
        track_name,
        artist_name,
        track_url,
        track_image_url,
        comment_date: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('An error occurred while adding the comment.');
  }
};

  
const deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  // Check if the authenticated user's ID is available
  if (!req.user || !req.user.user_id) {
    return res.status(401).send('Unauthorized: User not authenticated');
  }
  const user_id = req.user.user_id;

  try {
    // Retrieve the comment to check ownership
    const comment = await knex('comments').where({ comment_id }).first();
    if (!comment) {
      return res.status(404).send('Comment not found');
    }

    // Check if the user is the owner of the comment
    if (comment.user_id !== user_id) {
      return res.status(403).send('Forbidden: User does not have permission to delete this comment');
    }

    // Delete the comment
    await knex('comments').where({ comment_id }).del();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('An error occurred while deleting the comment.');
  }
};

  
  
  module.exports = {
    getCommentsByQuestionCard,
    addCommentToQuestionCard,
    deleteComment
  };
  