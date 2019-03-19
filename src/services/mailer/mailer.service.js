// Initializes the `mailer` service on path `/mailer`
const createService = require('feathers-mongoose');
const createModel = require('../../models/mailer.model');
const hooks = require('./mailer.hooks');

const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  // app.use('/mailer', createService(options));
  // Initialize our service with any options it requires
  app.use('/mailer', Mailer(smtpTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  })));

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
