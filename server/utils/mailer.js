let nodemailer = require('nodemailer');
const config = require('../configs/config.json');

exports.sendEmail_smtp = function(email) {
    console.log(config,email);
    let transporter = nodemailer.createTransport({
        //pool: true,
        host: config.smtp.emailRelay.host,
        port: config.smtp.emailRelay.port,
        //secure: true, // use TLS
        // auth: {
        //     user: "username",
        //     pass: "password"
        // },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // verify connection configuration
    // transporter.verify(function(error, success) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("Server is ready to take our messages");
    //     }
    // });

    let mailOptions = {
        from: email.senderID,
        to: email.receivers,
        subject: email.subject,
        text: email.text
    };

    return transporter.sendMail(mailOptions).then(function(res){
      return res;
    }).catch(function(err){
      return err;
    })
}


// sendEmail({
//     service: 'outlook',
//     senderID: 'jbm.aialerts@jbmgroup.com',
//     password: '6ng37802d!@j&',
//     receivers: 'ftl.paras@gmail.com',
//     subject: `AI_Server ${utils.host}`,
//     text: 'AI_Server ... started at ' + (new Date()).toISOString()
// });

exports.sendEmail = function(email) {
    let transporter = nodemailer.createTransport({
        service: email.service,
        auth: {
            user: email.senderID,
            pass: email.password
        }
    });

    let mailOptions = {
        from: email.senderID,
        to: email.receivers,
        subject: email.subject,
        text: email.text
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
