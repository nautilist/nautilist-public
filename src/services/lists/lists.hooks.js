const { authenticate } = require('@feathersjs/authentication').hooks;
const checkUser = require('../../hooks/check-user')
const addOwner = require('../../hooks/add-owner')
const preventDuplicates = require('../../hooks/prevent-duplicates')
const { populate } = require('feathers-hooks-common');
const { fastJoin } = require('feathers-hooks-common');
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

const linksPopulateSchema = {
  include: {
    service: '/api/links',
    nameAs: 'linksDetails',
    parentField: 'links',
    asArray: true,
    childField: '_id'
  }
};

const sectionsPopulateSchema = {
  include: {
    service: '/api/links',
    nameAs: 'sectionsDetails',
    parentField:'sections.links',
    select: (hook, parent, depth) => {
      if(parent.sections){
        let sections = parent.sections.map(section => section.links)
        sections = [].concat.apply([], sections);
        return { 
          _id: { 
            $in: sections
          } 
        }
      } else {
        return {}
      }
    },
    asArray:true
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
        fields: ['name', 'description', 'md']
      })
    ],
    get: [],
    create: [authenticate('jwt'), addOwner()], // users can create anonymously
    update: [authenticate('jwt'), checkUser()],
    patch: [authenticate('jwt'), checkUser()],
    remove: [authenticate('jwt'), checkUser()]
  },

  after: {
    all: [populate({schema:userPopulateSchema}), 
      populate({schema:collaboratorsPopulateSchema}),
      populate({schema:followersPopulateSchema}),
      populate({schema:linksPopulateSchema}),
      populate({schema:sectionsPopulateSchema})
    ],
    find: [ ],
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
