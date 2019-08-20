var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 3000;
app.get('/', function (req, res) {
    res.json('Server Started & Running');
});
app.post('/send-email', function (req, res) {
    let body = req.body;
    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xxx@xx.com',
            pass: 'xxxx'
        }
    });
    let mailOptions = {
        from: body.email, // sender address
        to: 'gsrdatta@gmail.com', // list of receivers
        subject: body.subject, // Subject line
        text: body.comment, // plain text body
        html: '<b>NodeJS Email: </b>' + JSON.stringify(body) // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.json("Email Sent")
    });

});
app.listen(port, function () {
    console.log('Server is running at port: ', port);
});