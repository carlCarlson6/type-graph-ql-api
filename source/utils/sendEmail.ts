import nodemailer from 'nodemailer';
import {account} from '../etherealEmailAccount';

export const sendEmail = async (email: string, url: string): Promise<void> => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {user: account.user, pass: account.pass},
        tls: { rejectUnauthorized: false }
    });

    const mailOptions = {
        from: account.user,
        to: email,
        subject: 'confirmation',
        text: 'confirm your account by clicking on the url',
        html: `<a href=${url}>${url}</a>`
    };

    console.log('loggg 1');
    const info = await transporter.sendMail(mailOptions);
    console.log('loggg 2');

    console.log('message sent', info.messageId);
    console.log('preview url', nodemailer.getTestMessageUrl(info));
}