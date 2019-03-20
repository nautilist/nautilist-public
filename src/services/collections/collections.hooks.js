const { authenticate } = require('@feathersjs/authentication').hooks;
const checkUser = require('../../hooks/check-user')
const addOwner = require('../../hooks/add-owner')
const { populate } = require('feathers-hooks-common');
const search = require('feathers-mongodb-fuzzy-search')
 

const userPopulateSchema = {
  include: {
    service: 'users',
    nameAs: 'ownerDetails',
    parentField: 'owner',
    childField: '_id',
    query:{
      $select: ['username', '_id'],
    }
  }
};

const projectPopulateSchema = {
  include: {
    service: '/api/projects',
    nameAs: 'projectsDetails',
    parentField: 'projects',
    asArray: true,
    childField: '_id',
  }
};

module.exports = {
  before: {
    all: [ ],
    find: [
      search(),
      search({  // regex search on given fields
        fields: ['name']
      })],
    get: [],
    create: [authenticate('jwt'), addOwner()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [populate({schema:userPopulateSchema}), populate({schema:projectPopulateSchema}) ],
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
