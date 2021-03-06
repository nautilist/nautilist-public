
module.exports = function (app) {
  const GMAIL = app.get('gmail_username');

  function getLink(type, hash) {
    let url;
    if(app.get('host') == 'localhost'){
      url = 'https://localhost:8080/' + type + '?token=' + hash
    } else {
      url = app.get('client_host') + '/' + type + '?token=' + hash
    }
    
    return url
  }

  function sendEmail(email) {
    return app.service('mailer').create(email).then(function (result) {
      console.log('Sent email', result)
    }).catch(err => {
      console.log('Error sending email', err)
    })
  }

  return {
    notifier: function (type, user, notifierOptions) {
      let tokenLink
      let email
      switch (type) {
        case 'resendVerifySignup': //sending the user the verification email
          tokenLink = getLink('verify', user.verifyToken)
          email = {
            from: GMAIL,
            to: user.email,
            subject: 'Verify Signup',
            html: tokenLink
          }
          return sendEmail(email)
          break

        case 'verifySignup': // confirming verification
          tokenLink = getLink('verify', user.verifyToken)
          email = {
            from: GMAIL,
            to: user.email,
            subject: 'Confirm Signup',
            html: 'Thanks for verifying your email'
          }
          return sendEmail(email)
          break

        case 'sendResetPwd':
          tokenLink = getLink('reset', user.resetToken)
          email = {
            from: GMAIL,
            to: user.email,
            subject: 'Reset Password',
            html: tokenLink
          }
          return sendEmail(email)
          break

        case 'resetPwd':
          tokenLink = getLink('reset', user.resetToken)
          email = {
            from: GMAIL,
            to: user.email,
            subject: 'Your password was reset',
            html: 'your password was reset'
          }
          return sendEmail(email)
          break

        case 'passwordChange':
          email = {
            from: GMAIL,
            to: user.email,
            subject: 'Nautilist - Your password was changed!',
            html: 'your password was changed!'
          }
          return sendEmail(email)
          break

        case 'identityChange':
          tokenLink = getLink('verifyChanges', user.verifyToken)
          email = {}
          return sendEmail(email)
          break

        default:
          break
      }
    }
  }
}