const knex = require('../../db');

const getQuestionCardById = async (req, res) => {
  const { qc_id } = req.params;

  try {
    // Fetch the question card
    const questionCard = await knex('question_cards').where('qc_id', qc_id).first();
    if (!questionCard) {
      return res.status(404).send('Question card not found');
    }

    // Fetch likes count
    const likesCount = await knex('likes').where('qc_id', qc_id).count('like_id as count').first();
    // Fetch comments count
    const commentsCount = await knex('comments').where('qc_id', qc_id).count('comment_id as count').first();
    // Fetch shares count
    const sharesCount = await knex('shares').where('qc_id', qc_id).count('share_id as count').first();

    // Combine data and respond
    res.json({
      id: qc_id,
      url: questionCard.image_url,
      description: questionCard.description,
      likes: likesCount ? likesCount.count : 0,
      comments: commentsCount ? commentsCount.count : 0,
      shares: sharesCount ? sharesCount.count : 0
    });
  } catch (error) {
    console.error('Error fetching question card data:', error);
    return res.status(500).send('An error occurred while fetching question card data.');
  }
};

module.exports = {
  getQuestionCardById,
};
