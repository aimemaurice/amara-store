const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AMARA API is running',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
