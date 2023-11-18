import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CardComponent = ({ questionText, qcId }) => {
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);
  // Add states for liked and shared to handle UI updates
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);

  // Fetch likes and shares when component mounts
  useEffect(() => {
    axios.get(`/question_cards/${qcId}/likes`)
      .then(response => setLikes(response.data.likes.length))
      .catch(error => console.error('Error fetching likes', error));

    axios.get(`/question_cards/${qcId}/shares`)
      .then(response => setShares(response.data.shares))
      .catch(error => console.error('Error fetching shares', error));
  }, [qcId]);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikes(prev => prev + 1);
      axios.post(`/question_cards/${qcId}/likes`, { user_id: 1 }) // Assuming user_id is 1 for now
        .catch(error => {
          console.error('Error adding like', error);
          setLiked(false);
          setLikes(prev => prev - 1);
        });
    }
  };

  const handleShare = () => {
    if (!shared) {
      setShared(true);
      setShares(prev => prev + 1);
      axios.post(`/question_cards/${qcId}/shares`, { user_id: 1 }) // Assuming user_id is 1 for now
        .catch(error => {
          console.error('Error adding share', error);
          setShared(false);
          setShares(prev => prev - 1);
        });
    }
  };

  return (
    <div className="card">
      <p>{questionText}</p>
      <div className="card-actions">
        <button onClick={handleLike} className={liked ? 'clicked' : ''}>
          {liked ? '😍' : '❤️'} {likes}
        </button>
        <button onClick={handleShare} className={shared ? 'clicked' : ''}>
          {shared ? '🔗' : '🔗'} {shares}
        </button>
      </div>
    </div>
  );
};

export default CardComponent;
