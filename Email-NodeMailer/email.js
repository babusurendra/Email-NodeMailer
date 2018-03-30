const app = require('express')();
const nodemailer = require('nodemailer');
//app.get('/send')
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
       // host: 'smtp.ethereal.email',
       // port: 587,
        //secure: false, // true for 465, false for other ports
        service : 'gmail',
        auth: {
            user: 'surendra0514@gmail.com', // generated ethereal user
            pass: '' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <surendra0514@gmail.com>', // sender address
        to: 'babusurendra.p@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: `<b>Welcome to my channel</b><br>
        <a href="https://google.co.in">Login to our portal</a><br>
                <img src = "cid:./india.jpg" hei alt="India" width="250" height="70">
        `, // html body
        attachments: [{
            filename: 'image.png',
            path: './india.jpg',
            cid: './india.jpg' //same cid value as in the html img src
        }]
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});