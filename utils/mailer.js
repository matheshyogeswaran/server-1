const express = require("express");

const nodemailer = require('nodemailer');

var senderEmail = "";
var subject = "";
var text = "";

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
        user: 'ragurajsivanantham@gmail.com',
        pass: 'FKDIzyr8bPEWBYQf'
    }
});

const mailOptions = {
    from: 'ragurajsivanantham@gmail.com',
    to: senderEmail,
    subject: subject,
    text: text,
};

function initiateMail(sEmail, sub, tex) {
    senderEmail = sEmail;
    subject = sub;
    text = tex;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = {initiateMail};