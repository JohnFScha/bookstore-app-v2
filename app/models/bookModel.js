import mongoose from 'mongoose';

var { Schema } = mongoose;
mongoose.Promise = global.Promise;

var Books = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishYear: {
    type: Number,
    required: true
  }},
  {
    timestamps: true,
  }
)

module.exports = mongoose.models.Books || mongoose.model("Books", Books);