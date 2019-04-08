// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.log(context.data)
    const currentResource = await context.app.service(`${context.path}`).get(context.id);
    
    // console.log(currentResource)
    // check if context.data has an Owner
    if (currentResource.hasOwnProperty('owner')) {
      // check if the user is the owner or a collaborator
      const currentUser = context.params.user._id
      if (currentResource.owner === currentUser || currentResource.collaborators.includes(currentUser) ) {
        // then return context
        return context;
        
      } 
      // else if(context.data.hasOwnProperty('$push') && context.data.$push.hasOwnProperty('followers')) {
      //   // if the patch is to add a follower allow it
      //   return context;
      // } else {
      //   // otherwise do not allow the patch to continue
      //   throw new Error('You are not the owner or a collaborator of this list, but you can make a copy and make a new one!');  
      // }
    } else {
      // if not, throw error
      throw new Error('You are not the owner or a collaborator of this list, but you can make a copy and make a new one!');
    }

  };
};
