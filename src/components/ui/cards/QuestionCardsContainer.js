// src/components/QuestionCardsContainer.js
import React, { useEffect, useState } from 'react';
import QuestionCard from './QuestionCard';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionCardsContainer = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch all the question cards
    axios.get('/question_cards')
      .then(response => {
        setCards(response.data); 
      })
      .catch(error => {
        console.error('Error fetching question cards:', error);
        // Add error handling for the UI
      });
  }, []);

  return (
    <div className="question-cards-container">
      <ToastContainer />
      {cards.map(card => (
        <QuestionCard
          key={card.id}
          id={card.id}
          url={card.image_url} 
          description={card.description} 
          initialLikes={card.likes} 
          initialShares={card.shares} 
        />
      ))}
    </div>
  );
};

export default QuestionCardsContainer;
