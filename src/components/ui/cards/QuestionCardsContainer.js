import React from 'react';
import QuestionCard from './QuestionCard';
import './QuestionCard.scss';

const QuestionCardsContainer = ({ mockData }) => {  // Accepting mockData as a prop

  return (
    <div className="question-card-container">
      {mockData.map(card => (
        <QuestionCard
          key={card.qcId}
          id={card.qcId}
          url={card.image_url}
          description={card.question} 
          initialLikes={card.likes}
          initialShares={card.shares}
          comments={card.comments}
        />
      ))}
    </div>
  );
};

export default QuestionCardsContainer;
