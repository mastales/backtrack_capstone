import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import './LoginPage.scss'; // Ensure you have the LoginPage.scss file for styles

const LoginPage = () => {
  const handleSpotifyLogin = () => {
    // Redirect to the backend route that initiates the Spotify OAuth flow
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/spotify`;
  };

  // ... rest of your component

  return (
    <Container className="login-page">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Welcome to Backtrack</h1>
          <h3>Music Journal Experience</h3>
          <Button variant="primary" size="lg" block onClick={handleSpotifyLogin}>
            🎵 🔐 Sign In with Spotify
          </Button>
          <hr />
          {/* The rest of your form for username and password login, if necessary */}
          <Form>
            <Form.Group controlId="formBasicUsername">
              <Form.Control type="text" placeholder="User Name" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="outline-primary" size="lg" block>
              Continue with Email
            </Button>
          </Form>
          <div className="login-footer">
            <a href="#forgot-password">Having trouble logging in?</a>
            <p>Lorem ipsum disclaimer and terms not to be read and only for placement.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
