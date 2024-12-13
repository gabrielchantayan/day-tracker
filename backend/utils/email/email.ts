import { log_email } from "../misc/logger";
import success_handler from "../misc/success-handler";
import * as tokens from "./tokens.json";

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: tokens.email,
		pass: tokens.password,
	},
});


const mail_footer = `

Mail sent by Joob. Please do not reply to this email.
`


const send_mail = (recipient: string, subject: string, message: string) => {

    let mailOptions = {
        from: 'youremail@gmail.com',
        to: recipient,
        subject: subject,
        text: message + mail_footer
    };

    log_email(`Sending email to ${recipient}`);
    log_email(message, 5);

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            log_email('Email sent: ' + info.response);
            return success_handler(true)
        }
    });
}


const send_otp_email = (recipient: string, otp: string, expiry: number) => {
    
    send_mail(recipient, "One-Time Password", `Your one-time password is: ${otp}\nThis code will expire in ${expiry} minutes.`);

}

export { send_mail, send_otp_email }