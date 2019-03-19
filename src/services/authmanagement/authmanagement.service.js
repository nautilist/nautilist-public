// Initializes the `authmanagement` service on path `/authmanagement`
const createService = require('feathers-mongoose');
// const createModel = require('../../models/authmanagement.model');
const hooks = require('./authmanagement.hooks');

// Initializes the `authmanagement` service on path `/authmanagement`
const authManagement = require('feathers-authentication-management');
const notifier = require('./notifier');

module.exports = function (app) {
  // const Model = createModel(app);
  // const paginate = app.get('paginate');

  // const options = {
  //   Model,
  //   paginate
  // };

  // Initialize our service with any options it requires
  // app.use('/authmanagement', createService(options));
   // Initialize our service with any options it requires
  app.configure(authManagement(notifier(app)));

  // Get our initialized service so that we can register hooks
  const service = app.service('authmanagement');

  // service.hooks(hooks);
};
