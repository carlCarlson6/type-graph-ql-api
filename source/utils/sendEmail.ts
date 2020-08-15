import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, url: string): Promise<void> => {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    const mailOptions = {
        from: 'confirmation@test.com',
        to: email,
        subject: 'confirmation',
        text: 'confirm your account by clicking on the url',
        html: `<a href=${url}>${url}</a>`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('message sent', info.messageId);
    console.log('preview url', nodemailer.getTestMessageUrl(info));
}