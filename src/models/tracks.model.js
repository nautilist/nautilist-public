const shortid = require('shortid');
const generate = require('project-name-generator');
// tracks-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tracks = new Schema({
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
    lists: [{
      type: String,
      required: false,
      default:[],
      ref: 'lists',
    }], // // reference to lists id,
    links: [{
      type: String,
      required: false,
      default:[],
      ref: 'links',
    }], // // reference to lists id,
    selectedColor: {
      type: Number,
      default: 2
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

  tracks.index({
    name: 'text',
    md: 'text',
    description: 'text'
  })

  return mongooseClient.model('tracks', tracks);
};
