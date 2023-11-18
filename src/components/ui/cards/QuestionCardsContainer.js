import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCard';
import './QuestionCard.scss';

const QuestionCardContainer = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchQuestionCards = async () => {
      try {
        // Replace '/api/question-cards' with the correct endpoint from your backend
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/question_cards/`);
        setCards(response.data); // Assuming the response data is the array of cards
      } catch (error) {
        console.error('Error fetching question cards:', error);
      }
    };

    fetchQuestionCards();
  }, []);

  return (
    <div className="question-card-container">
      {cards.map(card => (
        <QuestionCard
          key={card.qcId}
          id={card.qcId}
          url={card.image_url}
          description={card.description}
          initialLikes={card.likes}
          initialShares={card.shares}
        />
      ))}
    </div>
  );
};

export default QuestionCardContainer;
