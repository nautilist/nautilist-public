const shortid = require('shortid');
const generate = require('project-name-generator');

// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;
  const projects = new Schema({
    _id: {
      type: String,
      default: shortid.generate
    },
    alias:{
      type:String,
      default: generate({ words: 2, alliterative: true }).dashed
    },
    html: {
      type: String
    },
    md: {
      type: String
    },
    json: {
      type: Object
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    images: [{
      type: String // base64 image blobs
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    collections: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'collections'
    }], // reference to collections id
  }, {
    timestamps: true
  });

  return mongooseClient.model('projects', projects);
};
