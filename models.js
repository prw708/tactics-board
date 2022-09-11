var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BoardSchema = new Schema({
  uuid: { type: String, required: true, index: true, unique: true },
  title: { type: String, required: true, minlength: 1, maxlength: 50 },
  public: { type: Boolean, required: true },
  owner: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  updated: { type: Date },
  rating: { type: Number, min: 0, max: 5 },
  ratingsCompleted: { type: Number, default: 0 },
  raters: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  field: { type: String, required: true, enum: ['Soccer', 'Basketball', 'American Football'] },
  players: [{ 
    id: { type: Number, required: true }, 
    team: { type: String, required: true, enum: ['1', '2', 'Ball'] }, 
    color: { type: String, match: /^#[A-Fa-f0-9]{6}$/ },
    number: { type: String, match: /^[0-9]{0,2}$/ },
    name: { type: String, minlength: 0, maxlength: 50 },
    path: [{
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    }],
    speed: [{
      val: { type: Number, required: true },
      wait: { type: Number, required: true },
    }],
    current: {
      step: { type: Number, default: 0 },
      position: {
        x: { type: Number, required: true },
        y: { type: Number, required: true },
      },
      wait: { type: Number, default: 0 },
    },
  }],
});

module.exports = {
  board: BoardSchema
};
