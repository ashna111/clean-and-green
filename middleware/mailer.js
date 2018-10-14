var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cleanngreen111@gmail.com',
    pass: 'CleanNgreen1!',
  },
});

module.exports = transporter;