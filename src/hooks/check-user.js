// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    const currentResource = await context.app.service('/api/projects').get(context.id);
    
    // check if context.data has an Owner
    if (currentResource.hasOwnProperty('owner')) {
      // check if the user is the owner or a collaborator
      const currentUser = context.params.user._id
      if (currentResource.owner === currentUser || currentResource.collaborators.includes(currentUser) ) {
        // then return context
        return context;
      } 
    } else {
      // if not, throw error
      throw new Error('You are not the owner of this list, but you can make a copy and make a new one!');
    }

  };
};
