const nodemailer = require('nodemailer');
require("dotenv").config();

const email = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.SENHA
    }
});

module.exports = email;