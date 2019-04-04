// Initializes the `tracks` service on path `/api/tracks`
const createService = require('feathers-mongoose');
const createModel = require('../../models/tracks.model');
const hooks = require('./tracks.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate,
    whitelist: [ '$regex', '$text', '$search' ]
  };

  // Initialize our service with any options it requires
  app.use('/api/tracks', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/tracks');

  service.hooks(hooks);
};
