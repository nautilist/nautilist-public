const shortid = require('shortid');
const generate = require('project-name-generator');
// collections-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;
  const collections = new Schema({
    _id: {
      type: String,
      default: shortid.generate
    },
    featureType:{
      type:String,
      default: 'collection'
    },
    alias: {
      type: String,
      default: generate({
        words: 2,
        alliterative: true
      }).dashed
    },
    tags:[{
      type: String
      }],
    name: {
      type: String,
      required: true,
      index:'text'
    },
    description: {
      type: String,
      required: false,
      index:'text'
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    projects: [{
      type: String,
      required: false,
      default:[],
      ref: 'projects',
    }], // // reference to projects id,
    tracks: [{
      type: String,
      required: false,
      default:[],
      ref: 'tracks',
    }], // // reference to projects id,
    lists: [{
      type: String,
      required: false,
      default:[],
      ref: 'lists',
    }], // // reference to projects id,
    links: [{
      type: String,
      required: false,
      default:[],
      ref: 'links',
    }], // // reference to projects id,
    selectedColor: {
      type: Number,
      default: 3
    },
    colors: {
          type: Array,
          default: ["#FF725C", "#FFD700", "#FF80CC", "#9EEBCF", "#CDECFF", "#A463F2"],
          required: true
      },
      followers:[{
        type: String,
        required: true,
        ref: 'users',
        default:[]
      }], // reference to users id
  }, {
    timestamps: true
  });

  // indexes are added directly to the model
  // collections.index({ name: 'text' })

  return mongooseClient.model('collections', collections);
};
