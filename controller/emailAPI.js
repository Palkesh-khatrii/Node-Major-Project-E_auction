function sendMail(email, password) {
    var nodemailer = require('nodemailer');
    var ejs = require("ejs")
    var path = require('path')

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'palkeshkhatri.synsoft@gmail.com',
            pass: 'Keshpal@01101997'
            
        }
    });
    // ejs.renderFile(path.join(__dirname,"../views/emailTemplate.ejs"))
    var filepath = (path.join(__dirname,"../views/emailTemplate.ejs"))
    var response={email:email, password: password};
    ejs.renderFile(filepath,response,(err,data)=>{
        var mailOptions = {
            from: 'batchcontent2020@gmail.com',
            to: email,
            subject: 'Verification mail for eAuction',
            html: data
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })    
}
module.exports = sendMail