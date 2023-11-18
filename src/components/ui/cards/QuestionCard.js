import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import CommentModal from '../modals/CommentModal';

const QuestionCard = ({ qcId, url, description, initialLikes, initialShares, userProfile }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [shares, setShares] = useState(initialShares);
  const [shared, setShared] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleLike = (qcId) => {
    // ... existing logic for handleLike
  };

  const handleShare = (qcId) => {
    // ... existing logic for handleShare
  };

  const openCommentModal = () => {
    console.log("Opening Comment Modal");
    setIsCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    console.log("Closing Comment Modal");
    setIsCommentModalOpen(false);
  };

  return (
    <div className="question-card">
      
      <p>{description}</p>
      <div className="actions">
        <button onClick={() => handleLike(qcId)}>{liked ? '😍' : '❤️'} {likes}</button>
        <button onClick={openCommentModal}>💬 Comment</button>
        <button onClick={() => handleShare(qcId)}>🔗 {shares}</button>
      </div>
      
      <CommentModal
        show={isCommentModalOpen}
        handleClose={closeCommentModal}
        qcId={qcId}
        // userProfile={userProfile} // Pass the authenticated user's profile data
      />
    </div>
  );
};

export default QuestionCard;
