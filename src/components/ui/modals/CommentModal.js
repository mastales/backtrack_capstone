// src/components/CommentModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

const CommentModal = ({ show, handleClose, submitComment, qcId, existingComments }) => {
  const [commentText, setCommentText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // If you have a search bar and want to fetch search hits based on searchTerm,
    // you would trigger the search here and update `searchResults`.
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Trigger the search logic
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = () => {
    submitComment(commentText, qcId);
    setCommentText('');
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search for song"
              value={searchTerm}
              onChange={handleSearch}
              autoFocus
            />
            <ListGroup variant="flush">
              {searchResults.map((hit, index) => (
                <ListGroup.Item key={index}>{hit}</ListGroup.Item>
              ))}
            </ListGroup>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Add comments here..."
              value={commentText}
              onChange={handleCommentChange}
            />
          </Form.Group>
        </Form>
        <div className="existing-comments">
          <h5>Existing Comments</h5>
          <ListGroup variant="flush">
            {existingComments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment.username}: {comment.content}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleCommentSubmit}>+ Add Song & Comment</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
