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
const collaboratorsPopulateSchema = {
  include: {
    service: 'users',
    nameAs: 'collaboratorDetails',
    parentField: 'collaborators',
    childField: '_id',
    asArray: true,
    query:{
      $select: ['username', '_id'],
    }
  }
};

const followersPopulateSchema = {
  include: {
    service: 'users',
    nameAs: 'followersDetails',
    parentField: 'followers',
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
    create: [authenticate('jwt'), addOwner()], // users can create anonymously
    update: [authenticate('jwt'), checkUser()],
    patch: [authenticate('jwt'), checkUser()],
    remove: [authenticate('jwt'), checkUser()]
  },

  after: {
    all: [populate({schema:userPopulateSchema}), 
      populate({schema:collaboratorsPopulateSchema}),
      populate({schema:followersPopulateSchema})],
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
