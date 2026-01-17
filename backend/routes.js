const express = require('express');
const router = express.Router();


const {sendMail} = require('./api')

router.get('/whats', (req, res) => {
  res.json({ link: process.env.WHATSAPP_URL });
});

router.post('/email', sendMail);

module.exports = router;


