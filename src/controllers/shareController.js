const knex = require('../../db');
const passport = require('passport');

// Controller for shares

// Get share count for a question card
const getSharesByQuestionCard = async (req, res) => {
    const { qc_id } = req.params;
  
    try {
      // First, check if the question card exists
      const questionCard = await knex('question_cards').where('qc_id', qc_id).first();
      if (!questionCard) {
        return res.status(404).send('Question card not found');
      }
  
      // If question card exists, then fetch the share count
      const shareCount = await knex('shares').where('qc_id', qc_id).count('share_id as count').first();
  
      res.json({
        id: qc_id,
        shares: shareCount.count
      });
    } catch (error) {
      console.error('Error fetching shares:', error);
      res.status(500).send('An error occurred while fetching shares.');
    }
  };  
  
  
  // Add a share to a question card
  const addShareToQuestionCard = async (req, res) => {
    const { qc_id } = req.params;
    // Check if the authenticated user's ID is available
    if (!req.user || !req.user.user_id) {
      return res.status(401).send('Unauthorized: User not authenticated');
    }
  
    const user_id = req.user.user_id;
  
    try {
      const [newShareId] = await knex('shares').insert({
        qc_id,
        user_id
      });
  
      res.status(201).json({
        message: 'Share added successfully',
        share: {
          share_id: newShareId,
          qc_id,
          user_id,
          share_date: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error adding share:', error);
      res.status(500).send('An error occurred while adding the share.');
    }
  };
  
  
  module.exports = {
    getSharesByQuestionCard,
    addShareToQuestionCard,
  };
  