const knex = require('../../db');
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
  const { user_id, content, track_name, artist_name, track_url, track_image_url } = req.body;

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
  
    try {
      const deletedRows = await knex('comments').where('comment_id', comment_id).del();
  
      if (deletedRows) {
        res.status(200).json({ message: 'Comment deleted successfully' });
      } else {
        res.status(404).send('Comment not found');
      }
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
  