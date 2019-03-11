const { authenticate } = require('@feathersjs/authentication').hooks;
const checkUser = require('../../hooks/check-user')
const addOwner = require('../../hooks/add-owner')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), addOwner()], // users can create anonymously
    update: [authenticate('jwt'), checkUser()],
    patch: [authenticate('jwt'), checkUser()],
    remove: [authenticate('jwt'), checkUser()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
