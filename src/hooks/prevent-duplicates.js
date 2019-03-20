// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const currentResource = await context.app.service('/api/collections').get(context.id);
    // console.log(context.params)
    // console.log(context.data)
    
    if(context.data.hasOwnProperty("$push")){
      // check if context.data has an Owner
      if(context.data["$push"].hasOwnProperty('followers')){
        if (!currentResource.followers.includes( String(context.params.user._id))) {
          return context;
        } 
        else {
          // if not, throw error
          throw new Error('You are already a follower of this list!');
        }
      } else if(context.data["$push"].hasOwnProperty('projects')){
        if (!currentResource.projects.includes(context.data.$push.projects) ) {
          return context;
        } 
        else {
          // if not, throw error
          throw new Error('this project is already in this collection');
        }
      }
      
    } else {
      return context;
    }
    

  };
};
