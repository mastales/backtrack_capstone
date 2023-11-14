const knex = require('../../db');
// Controller for comments

// Get all comments for a question card
const getCommentsByQuestionCard = async (req, res) => {
  const { qc_id } = req.params;

  try {
    // Check if the question card exists
    const cardExists = await knex('question_cards').where('qc_id', qc_id).first();
    if (!cardExists) {
      return res.status(404).send('Question card not found');
    }

    // Fetch comments for the question card
    const comments = await knex('comments').where('qc_id', qc_id).select();

    res.json({
      id: qc_id,
      comments: comments
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('An error occurred while fetching comments.');
  }
};

  
  // Add a comment to a question card
  const addCommentToQuestionCard = async (req, res) => {
    const { qc_id } = req.params;
    const { user_id, content, track_name, artist_name, track_url, track_image_url } = req.body;
  
    try {
      // Check if the question card exists
      const cardExists = await knex('question_cards').where('qc_id', qc_id).first();
      if (!cardExists) {
        return res.status(404).send('Question card not found');
      }
  
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
          comment_date: new Date().toISOString(),
          track_name,
          artist_name,
          track_url,
          track_image_url
        }
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).send('An error occurred while adding the comment.');
    }
  };
  
  
// Function to add a comment and song to a question card
const postCommentWithSong = async (req, res) => {
    const { qc_id } = req.params;
    const { comment, username, profile_picture_url, track } = req.body; // Assuming these fields are in the request body
  
    // Here you would handle the insertion of the comment and song data into your database
    // This is a placeholder for the actual database logic
  
    res.status(201).json({
      message: 'Comment with song data added successfully',
      comment: {
        qc_id,
        comment,
        username,
        profile_picture_url,
        date: new Date().toISOString(),
        track,
      },
    });
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
    postCommentWithSong,
    deleteComment
  };
  