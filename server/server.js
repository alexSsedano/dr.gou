var express = require("express");
var app = express();
var nodemailer = require('nodemailer');

app.use(express.static(__dirname + "/public"));
var port = process.env.PORT || 3000;
var server = app.listen(port);
var io = require("socket.io").listen(server);

io.on("connection", function (socket) {
    console.log("CONECTADO DE UNA VEZ!");
    socket.on('registrado', function (toSend) {
        socket.lel = toSend
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'drgouconfirmed@gmail.com',
                pass: 'Trev123_'
            }
        });

        var mailOptions = {
            from: 'drgouconfirmed@gmail.com',
            to: socket.lel,
            subject: 'xd',
            text: 'xd'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });
});