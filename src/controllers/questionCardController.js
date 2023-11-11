const knex = require('../../db');

// Function to get a question card by ID with all related data
const getQuestionCardById = async (req, res) => {
  const { qc_id } = req.params;
  let questionCard;

  try {
    // Fetch the question card
    const questionCard = await knex('question_cards').where('qc_id', qc_id).first();
    if (!questionCard) {
      return res.status(404).send('Question card not found');
    }
  } catch (error) {
    console.error('Error fetching question card:', error);
    return res.status(500).send('An error occurred while fetching the question card.');
  }

  try {
    // Fetch likes count
    const likesCount = await knex('likes').where('qc_id', qc_id).count('like_id as count').first();
    // Fetch comments count
    const commentsCount = await knex('comments').where('qc_id', qc_id).count('comment_id as count').first();
    // Fetch shares count
    const sharesCount = await knex('shares').where('qc_id', qc_id).count('share_id as count').first();

    // Combine data
    const responseData = {
      id: qc_id,
      url: questionCard.image_url,
      description: questionCard.description,
      likes: likesCount.count,
      comments: commentsCount.count,
      shares: sharesCount.count
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching likes/comments/shares:', error);
    return res.status(500).send('An error occurred while fetching likes, comments, or shares.');
  }
};
  
  module.exports = {
    getQuestionCardById,
  };