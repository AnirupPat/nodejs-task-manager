const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = "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"

sgMail.setApiKey(sendgridAPIKey)
sgMail.send({
    to: 'anirup049@gmail.com',
    from: 'anirup049@gmail.com',
    subject: 'This is my test email..',
    text: 'I hope this one gets to you !'
})
