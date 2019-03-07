const users = require('./users/users.service.js');
const projects = require('./projects/projects.service.js');
const collections = require('./collections/collections.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(projects);
  app.configure(collections);
};
