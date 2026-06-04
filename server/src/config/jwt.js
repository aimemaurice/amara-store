const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const jwtExpire = process.env.JWT_EXPIRE || '7d';

module.exports = {
  jwtSecret,
  jwtExpire,
};
