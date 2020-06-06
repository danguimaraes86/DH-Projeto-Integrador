const nodemailer = require('nodemailer');

const email = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'contatovegme1@gmail.com',
        pass: '@1qa2ws@'
    }
});

module.exports = email;