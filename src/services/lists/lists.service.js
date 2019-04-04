// Initializes the `lists` service on path `/api/lists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/lists.model');
const hooks = require('./lists.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    whitelist: [ '$regex', '$text', '$search' ]
  };

  // Initialize our service with any options it requires
  app.use('/api/lists', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/lists');

  service.hooks(hooks);
};
