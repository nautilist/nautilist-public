// Initializes the `links` service on path `/links`
const createService = require('feathers-mongoose');
const createModel = require('../../models/links.model');
const hooks = require('./links.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    whitelist: [ '$regex', '$text', '$search' ]
  };

  // Initialize our service with any options it requires
  app.use('/api/links', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/links');

  service.hooks(hooks);
};
