// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // return context;
    throw(new Error('Sorry, we cannot delete links because they are a global resource in Nautilist'))
  };
};
