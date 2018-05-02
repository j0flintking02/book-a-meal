import { hashPassword, checkPassword } from '../lib/encrypt';
import createToken from '../lib/createToken';
import users from '../test/usersTestData';


class UserController {
  // Create user account
  static createUser(req, res) {
    const newUser = {};
    const error = {};
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const matchedUser = users.filter(user => (
      user.email === email.toLowerCase()
    ))[0];

    // Check if user already exist
    if (matchedUser) {
      error.email = 'Email already exists';
      return res.status(422).json({
        message: error.email,
        status: 'error',
        error,
      });
    }

    // Hash user password and initialize new user
    return hashPassword(password).then((hashedPassword) => {
      // Determine role to assign user
      newUser.id = users.length + 1;
      newUser.name = name;
      newUser.email = email.toLowerCase();
      newUser.password = hashedPassword;
      newUser.role = role;

      users.push(newUser);
      // Create token for new created user
      const token = createToken(newUser.id);
      return res.status(201)
        .header('Authorization', `Bearer ${token}`)
        .json({
          message: 'User successfully created',
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          },
          token,
          status: 'success',
        });
    });
  }

  // Sign In to account
  static signinUser(req, res) {
    const { email, password } = req.body;
    const error = {};
    const matchedUser = users.filter(user => (
      user.email === email.toLowerCase()
    ))[0];

    if (!matchedUser) {
      error.email = 'User does not exist';
      return res.status(404).json({
        message: error.email,
        status: 'error',
        error,
      });
    }

    return checkPassword(password, matchedUser.password)
      .then((match) => {
        if (match) {
          // Create token for user
          const token = createToken(matchedUser.id);

          return res.status(200)
            .header('Authorization', `Bearer ${token}`)
            .json({
              message: 'User successfully signed in.',
              user: {
                id: matchedUser.id,
                name: matchedUser.name,
                email: matchedUser.email,
              },
              token,
              status: 'success',
            });
        }
        error.password = 'You entered a wrong password';
        return res.status(401).json({
          message: error.password,
          status: 'error',
          error,
        });
      });
  }
}

export default UserController;