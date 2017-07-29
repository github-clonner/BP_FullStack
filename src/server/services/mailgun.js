import { MAILGUN_KEY, MAILGUN_DOMAIN, APP_NAME, APP_EMAIL } from '../../shared/config'

const mailgun = require('mailgun-js')({ apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN })

// Create and export function to send emails through Mailgun API
exports.sendEmail = function sendEmail(recipient, message) {
  const data = {
    from: `${APP_NAME} <${APP_EMAIL}>`,
    to: recipient,
    subject: message.subject,
    text: message.text
  }

  return new Promise((resolve, reject) => {
    mailgun.messages().send(data, (error, resp) => {
      if (error) {
        reject(error)
      }
      resolve(resp)
    })
  })
}
