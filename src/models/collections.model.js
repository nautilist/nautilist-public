// collections-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const collections = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    owner: {
      type: String, required: true
    },
    projects:[{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'projects'
    }], // // reference to projects id
  }, {
    timestamps: true
  });

  return mongooseClient.model('collections', collections);
};
