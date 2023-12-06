import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './QuestionCard.scss';
import CommentToast from './CommentToast'; // Import the CommentToast component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuestionCard = ({ qcId, url, description, initialLikes, initialShares, comments }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [shares, setShares] = useState(initialShares);
  const [showComments, setShowComments] = useState(false); // State to control comment toasts

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleShare = () => {
    setShares(shares + 1);
    const mockURL = `https://example.com/${qcId}`; // Replace with your mock URL logic
    navigator.clipboard.writeText(mockURL);
    toast.success('Link copied to clipboard!', {
      position: 'top-right',
      autoClose: 2000,
    });
  };

  const toggleComments = () => {
    setShowComments(!showComments); // Toggle showComments when "💬 Comments" button is clicked
  };

  return (
    <div className="question-card">
      <Card>
        <Card.Body>
          <Card.Title className='card-title'>Question</Card.Title>
          <Card.Text className='card-text'>{description}</Card.Text>
          <div className="actions">
            <Button 
              className="custom-button" 
              onClick={handleLike}>
              {liked ? '😍' : '💚'} {likes}
            </Button>
            <Button 
              className="custom-button" 
              onClick={toggleComments}>
              💬 Comments
            </Button>
            <Button 
              className="custom-button" 
              onClick={handleShare}>
              🔗 {shares}
            </Button>

          </div>
        </Card.Body>
      </Card>

      {/* Display Comment Toasts */}
      {showComments && (
        <div className="comment-toasts">
          {comments.map((comment, index) => (
            <CommentToast key={index} comment={comment} />
          ))}
        </div>
      )}

      {/* React Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default QuestionCard;
