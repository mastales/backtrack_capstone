const knexConfig = require('../../knexfile.js');
const knexLibrary = require('knex');
const passport = require('passport');

const knex = knexLibrary(knexConfig);

// Controller for likes

// Get all likes for a question card
const getLikesByQuestionCard = async (req, res) => {
  const { qc_id } = req.params;

  try {
    const likes = await knex('likes')
      .select('like_id', 'user_id', 'date')
      .where('qc_id', qc_id);

    res.json({
      id: qc_id,
      likes: likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching likes.');
  }
};

// Add a like to a question card
const addLikeToQuestionCard = async (req, res) => {
  const { qc_id } = req.params;
  
  // Check if the authenticated user's ID is available
  if (!req.user || !req.user.user_id) {
    return res.status(401).send('Unauthorized: User not authenticated');
  }
  
  const user_id = req.user.user_id;

  console.log('User ID:', user_id, 'Type:', typeof user_id);
  console.log('Request body:', req.body);

  try {
    const [newLikeId] = await knex('likes').insert({
      qc_id,
      user_id
    });

    res.status(201).json({
      message: 'Like added successfully',
      like: {
        like_id: newLikeId,
        qc_id,
        user_id,
        date: new Date().toISOString() 
      }
    });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).send('An error occurred while adding the like.');
  }
};

const removeLikeFromQuestionCard = async (req, res) => {
  const { like_id } = req.params;

  // Check if the authenticated user's ID is available
  if (!req.user || !req.user.user_id) {
    return res.status(401).send('Unauthorized: User not authenticated');
  }
  const user_id = req.user.user_id;

  try {
    // Retrieve the like to check ownership
    const like = await knex('likes').where({ like_id }).first();
    if (!like) {
      return res.status(404).send('Like not found');
    }

    // Check if the user is the owner of the like
    if (like.user_id !== user_id) {
      return res.status(403).send('Forbidden: User does not have permission to remove this like');
    }

    // Remove the like
    await knex('likes').where({ like_id }).del();
    res.json({ message: 'Like removed successfully' });
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).send('An error occurred while removing the like.');
  }
};


module.exports = {
  getLikesByQuestionCard,
  addLikeToQuestionCard,
  removeLikeFromQuestionCard,
};
