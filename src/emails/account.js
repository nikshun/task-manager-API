const sgMail = require('@sendgrid/mail')

const apiKey = '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'

sgMail.setApiKey(apiKey)

sgMail.send({
    to:'madniklek@gmail.com',
    from:'madniklek@gmail.com',
    subject:'Check out this spam email :)',
    text:'I hope this one got to you safely'
})