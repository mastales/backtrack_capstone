const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const knex = require('../../db'); 

const findOrCreateUser = ({ spotifyId, username, profilePicture }) => {
    return knex('users')
      .select('*')
      .where({ spotify_id: spotifyId })
      .first()
      .then(user => {
        if (user) {
          // User exists, update information
          return knex('users')
            .where({ spotify_id: spotifyId })
            .update({
              username: username,
              profile_picture_url: profilePicture,
              updated_at: new Date()
            })
            .then(() => {
              return { ...user, username, profile_picture_url: profilePicture };
            });
        } else {
          // User does not exist, create new
          return knex('users')
            .insert({
              spotify_id: spotifyId,
              username: username,
              profile_picture_url: profilePicture
            })
            .returning('*') // Returning all columns of the newly inserted row
            .then(rows => rows[0]);
        }
      });
  };

const configurePassport = () => {
  passport.use(new SpotifyStrategy({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      findOrCreateUser({
        spotifyId: profile.id,
        username: profile.displayName,
        profilePicture: profile.photos[0]
      })
      .then(user => done(null, user))
      .catch(err => done(err));
    }
  ));

  passport.serializeUser((user, done) => {
    console.log('Serializing user:', user);
    done(null, user.user_id); 
    console.log('Serialized user id:', user.user_id);
  });

  passport.deserializeUser((userId, done) => {
    console.log('Deserializing user, user id:', userId);
    knex('users')
      .where({ user_id: userId })
      .first()
      .then(user => {
        console.log('Deserialized user:', user);
        done(null, user);
      })
      .catch(err => {
        console.error('Error in deserialization:', err);
        done(err);
      });
  });
};

module.exports = configurePassport;
