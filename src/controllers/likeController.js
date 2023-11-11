import knexConfig from "../../knexfile.js";
import knexLibrary from "knex";

const knex = knexLibrary(knexConfig);

// Controller for likes

// Get all likes for a question card
const getLikesByQuestionCard = async (req, res) => {
  const { qc_id } = req.params;

  try {
    // Using Knex to build the query
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
    const user_id = req.user.id; // Assuming user id from authenticated user
  
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
      console.error(error);
      res.status(500).send('An error occurred while adding the like.');
    }
  };
  
  const removeLikeFromQuestionCard = async (req, res) => {
    const { like_id } = req.params;
  
    try {
      await knex('likes')
        .where('like_id', like_id)
        .del();
  
      res.json({
        message: 'Like removed successfully'
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while removing the like.');
    }
  };
  
  
  module.exports = {
    getLikesByQuestionCard,
    addLikeToQuestionCard,
    removeLikeFromQuestionCard,
  };
  