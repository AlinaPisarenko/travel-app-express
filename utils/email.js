const nodemailer = require('nodemailer')

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(' ')[0]
        this.url = url
        this.from = 'Alina Pisarenko <test@test.com>'

    }
}

const sendEmail = async options => {
    // 1. Creating transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,

        }
    })

    // 2. Defining email options
    const mailOptions = {
        from: 'Alina Pisarenko <test@test.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
        // html:
    }

    // 3. Sending email
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail