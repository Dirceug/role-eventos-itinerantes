const admin = require('../firebase');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    console.error('No token provided');
    return res.status(403).json({ message: 'No token provided.' });
  }

  admin.auth().verifyIdToken(token)
    .then((decodedToken) => {
      console.log('Token verified:', decodedToken);
      req.uid = decodedToken.uid;
      next();
    })
    .catch((error) => {
      console.error('Failed to authenticate token:', error);
      res.status(401).json({ message: 'Failed to authenticate token.', error });
    });
};

module.exports = verifyToken;