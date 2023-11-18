// src/components/QuestionCard.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const QuestionCard = ({ id, url, description, initialLikes, initialShares }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [shares, setShares] = useState(initialShares);
  // No need for 'liked' state if we don't track the unliking
  const [shared, setShared] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handleShare = (qcId) => {
    // If the card has already been shared, we don't do anything
    if (shared) return;

    setShares(prev => prev + 1);
    setShared(true); // Mark as shared
    axios.post(`/question_cards/${qcId}/shares`, { user_id: 'the_actual_user_id' }) // Replace with actual user ID
      .then(response => {
        // Construct the URL to be copied
        const shareLink = window.location.origin + `/question_card/${qcId}`; // Adjust if your URL structure is different
        toast.info(`Card shared! Link: ${shareLink}`, {
          position: "top-center",
          autoClose: false,
          closeOnClick: true,
          draggable: true,
        });
      })
      .catch(error => {
        console.error('Error adding share', error);
        setShares(prev => prev - 1);
        setShared(false); // Revert shared status
      });
  };


  const handleLike = (qcId) => {
    if (!liked) {
      // Not liked yet, so post a new like
      setLikes((prev) => prev + 1);
      axios.post(`/question_cards/${qcId}/likes`, { user_id: 'the_actual_user_id' }) // Replace with actual user ID
        .then((response) => {
          // If the backend response includes the like id, update state
          setLikeId(response.data.like.like_id);
          setLiked(true);
        })
        .catch((error) => {
          console.error('Error adding like', error);
          setLikes((prev) => prev - 1); // Revert optimistic like count update
        });
    } else {
      // Already liked, so send a request to remove the like
      if (likeId) {
        setLikes((prev) => prev - 1);
        axios.delete(`/question_cards/${qcId}/likes/${likeId}`)
          .then(() => {
            setLiked(false);
            setLikeId(null); // Clear the likeId since the like has been removed
          })
          .catch((error) => {
            console.error('Error removing like', error);
            setLikes((prev) => prev + 1); // Revert optimistic like count update
          });
      }
    }
  };

// Function to handle opening the comment modal
const openCommentModal = () => {
  setIsCommentModalOpen(true);
};

// Function to handle closing the comment modal
const closeCommentModal = () => {
  setIsCommentModalOpen(false);
};


  return (
    <div className="question-card">
      <img src={url} alt="Question" />
      <p>{description}</p>
      <div className="actions">
        <button onClick={() => handleLike(id)}>{liked ? '😍' : '❤️'} {likes}</button>
        <Button onClick={openCommentModal}>💬 Comment</Button>
        <button onClick={() => handleShare(id)}>🔗 {shares}</button>
        {/* Comments functionality will go here */}
        <CommentModal
        show={isCommentModalOpen}
        handleClose={closeCommentModal}
        qcId={id}
        userProfile={userProfile} // Pass the authenticated user's profile data
      />
      </div>
    </div>
  );
};

export default QuestionCard;
