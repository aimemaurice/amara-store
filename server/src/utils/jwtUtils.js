const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/jwt');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, jwtSecret, {
    expiresIn: jwtExpire,
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
