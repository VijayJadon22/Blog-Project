const nodemailer = require('nodemailer');

async function sendEmail(userEmail) {
    // Create a test account using Ethereal email
    let testAccount = await nodemailer.createTestAccount();

    // Configure the SMTP transporter
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            user: '',
            pass: ''
        }
    });

    // Define the email options
    let mailOptions = {
        from: '"Vijay Jadon" <>', // Sender address 
        to: userEmail, // Recipient address 
        subject: "Welcome to Our Blog!", // Subject line 
        text: 'Welcome to our blog! We are excited to have you on board.', // Plain text body 
        html: '<p>Welcome to our blog! We are excited to have you on board.</p>'
    }

    // Send the email
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview URL for the sent email
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = {sendEmail};