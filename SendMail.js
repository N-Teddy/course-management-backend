require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

transporter.sendMail({
    from: '"Seven Academy" <seven@gmail.com>',
    to: 'example@gmail.com',
    subject: 'Test send mail',
    text: 'Hello World!'
}).then(send => {
    console.log(send);
}).catch(err => {
    console.log(err);
})