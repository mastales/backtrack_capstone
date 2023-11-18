import React from 'react';
import { Container } from 'react-bootstrap';
import './AuthFailedPage.scss';

const AuthFailedPage = () => {
  return (
    <Container className="auth-failed-page">
      <h1>Authentication Failed</h1>
      <p>Sorry, we were not able to sign you in. Please try again later.</p>
    </Container>
  );
};

export default AuthFailedPage;
