// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: {
      type: String,
      unique: true,
      required:true,
      lowercase: true
    },
    password: {
      type: String,
      required:true,
    },
    username:{
      type:String,
      unique:true,
      required:true
    },
    profile_image: {
      type: String
    },
    bio: {
      type: String,
      required:true,
      default:'Hi!'
    },
    githubId: {
      type: String
    },
    selectedEmoji: {
      type: Number,
      default: () => Math.floor(Math.random() * 11),
      required:true
    },
    emojis: {
          type: Array,
          default: ['BEAR-1F43B.png','CHICKEN-1F414.png','COW-1F42E.png','DOG-1F436.png','FROG-1F438.png','HAMSTER-1F439.png','MONKEY-1F435.png','MOUSE-1F42D.png','PANDA-1F43C.png','PIG-1F437.png','TIGER-1F42F.png','WOLF-1F43A.png'],
          required: true
      },
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
