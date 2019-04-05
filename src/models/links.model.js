const generate = require('project-name-generator');
const shortid = require('shortid');
// links-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;
  const links = new Schema({
    _id: {
      type: String,
      default: shortid.generate
    },
    selectedColor: {
      type: Number,
      default: 3
    },
    colors: {
      type: Array,
      default: ["#FF725C", "#FFD700", "#FF80CC", "#9EEBCF", "#CDECFF", "#A463F2"],
      required: true
    },
    url: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    tags: [{
      type: String
    }],
    featureType: {
      type: String,
      default: 'links'
    },
    meta: {
      type: Object,
      required: false
    }
  }, {
    timestamps: true
  });

  links.index({
    name: 'text',
    description: 'text'
  })

  return mongooseClient.model('links', links);
};
