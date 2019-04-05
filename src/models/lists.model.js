const shortid = require('shortid');
const generate = require('project-name-generator');
// lists-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.


module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const sectionSchema = new Schema({
    _id: {
      type: String,
      default: shortid.generate
    },
    alias: {
      type: String,
      default: generate({
        words: 2,
        alliterative: true
      }).dashed
    },
    name: {
      type: String, 
      default:'A friendly section title',
      required:false
    },
    description: {
      type: String, 
      default:'A very nice section description.',
      required:false
    },
    links:{
      type: [String],
      required: false,
      ref: 'links',
      default:[]
    }
  })

  const lists = new Schema({
    _id: {
      type: String,
      default: shortid.generate
    },
    alias: {
      type: String,
      default: generate({
        words: 2,
        alliterative: true
      }).dashed
    },
    html: {
      type: String
    },
    md: {
      type: String,
      index: 'text'
    },
    json: {
      type: Object
    },
    name: {
      type: String,
      index: 'text'
    },
    description: {
      type: String,
      index: 'text'
    },
    images: [{
      type: String // base64 image blobs
    }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    collaborators: [{
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
      default: []
    }], // reference to collections id
    collections: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'collections'
    }], // reference to collections id
    selectedColor: {
      type: Number,
      default: 1
    },
    sections:{
      type: [sectionSchema],
      default:[{ 
          "name": "", 
          "description": "", 
          _id: shortid.generate(),
          links:[]
      }],
    },
    links:[{
      type: String,
      required: false,
      ref: 'links'
    }],
    colors: {
      type: Array,
      default: ["#FF725C", "#FFD700", "#FF80CC", "#9EEBCF", "#CDECFF", "#A463F2"],
      required: true
    },
    tags: [{
      type: String
    }],
    featureType: {
      type: String,
      default: 'lists'
    },
    suggested: {
      type: Array,
      default: [],
      required: true
    },
    followers: [{
      type: String,
      required: true,
      ref: 'users',
      default: []
    }], // reference to users id
  }, {
    timestamps: true
  });

    // indexes are added directly to the model
    lists.index({
      name: 'text',
      md: 'text',
      description: 'text'
    })

  return mongooseClient.model('lists', lists);
};
