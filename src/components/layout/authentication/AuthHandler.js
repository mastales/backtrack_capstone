import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';

const AuthHandler = () => {
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const spotifyCode = searchParams.get('code'); // Spotify should return a code
    
    if (spotifyCode) {
      // Exchange the code for a token and fetch user details
      fetch('/auth/spotify/callback', {
        method: 'GET',
        // Add headers if needed
      }).then(response => response.json())
        .then(data => {
          setUser({
            spotifyId: data.spotify_id,
            username: data.username,
            profilePictureUrl: data.profile_picture_url,
            // You might want to store the access token as well
          });
          // Redirect to the home page or dashboard
        }).catch(error => {
          console.error('Error during authentication:', error);
        });
    }
  }, [location, setUser]);

  // Render nothing or a loading spinner
  return null;
};

export default AuthHandler;
