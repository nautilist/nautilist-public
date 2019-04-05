// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currentResource = await context.app.service(`${context.path}`).get(context.id);
    
    if (currentResource.hasOwnProperty('sections')) {
    
      if(currentResource.sections.length - 1 < 0){
        throw new Error('Sorry! lists always require 1 section to exist for now.');
      } else {
        return context
      }

    } else {
      return context;
    }

  };
};
