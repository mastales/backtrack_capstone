import React from 'react';
import Toast from 'react-bootstrap/Toast';
import './CommentToast.scss';

const CommentToast = ({ comment, onClose }) => {
  return (
    <Toast className="comment-toast" onClose={onClose} show>
      <Toast.Header className="hide-close-button">
        <strong className="me-auto">{comment.username}</strong>
      </Toast.Header>
      <Toast.Body className="comment-body">{comment.comment}</Toast.Body>
    </Toast>
  );
};

export default CommentToast;
