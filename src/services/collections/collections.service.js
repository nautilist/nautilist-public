// Initializes the `collections` service on path `/api/collections`
const createService = require('feathers-mongoose');
const createModel = require('../../models/collections.model');
const hooks = require('./collections.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  // const whitelist = {whitelist: [ '$regex', '$text' ]}

  const options = {
    Model,
    paginate,
    whitelist: [ '$regex', '$text', '$search' ]
  };

  // Initialize our service with any options it requires
  app.use('/api/collections', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/collections');

  service.hooks(hooks);
};
