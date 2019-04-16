const { authenticate } = require('@feathersjs/authentication').hooks;
const verifyHooks = require('feathers-authentication-management').hooks;
const accountService = require('../authmanagement/notifier');
const commonHooks = require('feathers-hooks-common');
const search = require('feathers-mongodb-fuzzy-search')
const checkUser = require('../../hooks/check-user')

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;


module.exports = {
  before: {
    all: [],
    find: [ 
      search()
      // search({  // regex search on given fields
      //   fields: ['username']
      // }) 
    ],
    get: [ ],
    create: [ hashPassword(), verifyHooks.addVerification() ],
    update: [
      commonHooks.disallow('external')
    ],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(true, 
          'email',
          'username',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires'
        
        ),
        hashPassword(),
        authenticate('jwt')
      )
    ],
    remove: [ authenticate('jwt'), checkUser() ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),protect('email') 
    ],
    find: [],
    get: [],
    create: [
      context => {
        accountService(context.app).notifier('resendVerifySignup', context.result)
      },
      verifyHooks.removeVerification()
    ],
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
