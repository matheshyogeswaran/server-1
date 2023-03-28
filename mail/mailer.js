const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nets.lambda@gmail.com',
        pass: ''
    }
});

async function sendMail(mailData) {
    console.log("Mail Service Called.")
    const mailOptions = {
        from: 'nets.lambda@gmail.com',
        to: mailData.to,
        subject: mailData.subject,
        html: mailData.html
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        // console.log('Email sent: ' + info.response);
        return true;
    } catch {
        console.log(error);
        return false;
    }
}

module.exports = sendMail;