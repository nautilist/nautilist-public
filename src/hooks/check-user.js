// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    
    const currentResource = await context.app.service(`${context.path}`).get(context.id);
    
    // console.log(currentResource)
    // check if context.data has an Owner
    if (currentResource.hasOwnProperty('owner')) {
      // check if the user is the owner or a collaborator
      // console.log(context.data)
      // console.log(context.params)

      const currentUser = context.params.user._id
      // console.log(currentResource.owner, currentUser)
      // console.log(currentResource.collaborators)
      const isCollaborator = currentResource.collaborators.filter(item => String(item) === String(currentUser)).length > 0
      const isOwner = String(currentResource.owner) === String(currentUser);
      if (isOwner || isCollaborator) {
        console.log("you are either an owner or collaborator")
        // then return context
        return context; 
      } 
      else if(context.data.hasOwnProperty('$push') && context.data.$push.hasOwnProperty('followers') || 
      context.data.hasOwnProperty('$pull') && context.data.$pull.hasOwnProperty('followers') && String(context.data.$pull.followers) === String(currentUser)) {
        // if the patch is to add a follower allow it
        return context;
      } else {
        // otherwise do not allow the patch to continue
        throw new Error('You are not the owner or a collaborator of this list, but you can make a copy and make a new one!');  
      }
    } else {
      // if not, throw error
      throw new Error('You are not the owner or a collaborator of this list, but you can make a copy and make a new one!');
    }

  };
};
