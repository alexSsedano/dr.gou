var express = require("express");
var app = express();
var nodemailer = require('nodemailer');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.static(__dirname + "/public"));
var port = process.env.PORT || 3000;
var server = app.listen(port);
var io = require("socket.io").listen(server);

io.on("connection", function (socket) {
    console.log("Usuario conectado.");
    socket.on('registrado', function (toSend) {
        
        var datos = JSON.parse(toSend)
        
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'drgouconfirmed@gmail.com',
                pass: 'Trev123_'
            }
        });

        var mailOptions = {
            from: 'drgouconfirmed@gmail.com',
            to: datos[0].email,
            subject: "DR.GOU",
            text: "Bienvenido a DR.GOU "+datos[0].username+".\n"+"Este es el email de confirmacion de su registro en DR.GOU.\n"+"Su correo electronico es: "+datos[0].email+".\n"+"Su nombre de susuario es: "+datos[0].username+".\n"+"Su contraseña es: "+datos[0].password+"."
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