const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// Example implementation of user repository
const { findUserByEmail, findUserById } = require('./user-repository');

// Initialize Passport.js configuration
function initializeAdminPassport(passport) {
  // Define the Local strategy
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await findUserByEmail(email);

        // Check if the user exists and if the password is correct
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // User authentication successful
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // Serialize user object
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user object
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initializeAdminPassport;