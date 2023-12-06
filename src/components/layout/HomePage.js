import React from 'react';
import QuestionCardsContainer from '../ui/cards/QuestionCardsContainer';

const HomePage = ({ mockData }) => { 
  return (
    <div>  
      <QuestionCardsContainer mockData={mockData} /> 
    </div>
  );
};

export default HomePage;
