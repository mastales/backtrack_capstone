import React, { useState, useEffect } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap';
import axios from 'axios'; // Make sure axios is installed

const CommentModal = ({ qcId, show, handleClose }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    
    const fetchComments = async () => {
      console.log('Fetching comments for qcId:', qcId); // Log to verify qcId
      try {
        // Fetch comments from the backend
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/question_cards/${qcId}/comments`);
        console.log('Response:', response); // Log to inspect the response
        if (response.status === 200) {
          setComments(response.data.comments); // Update state with fetched comments
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (show && qcId) {
      fetchComments(); // Call fetchComments only if the modal is shown and cardId is present
    }
  }, [show, qcId]); // Dependency array includes show and cardId

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {comments.length > 0 ? (
          <ListGroup>
            {comments.map((comment, index) => (
              <ListGroup.Item key={index}>
                <strong>{comment.username}</strong>: {comment.content}
                {/* You can add more details from the comment here */}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No comments available.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
