const mongoose = require("mongoose");
const { Schema } = mongoose;
const newsSchema = new Schema({
  // fetch the saved articles of only that particlualr user which is logged in and for that refer user document from the
  // database as id will work as foreign key
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  newsUrl: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("news", newsSchema);
