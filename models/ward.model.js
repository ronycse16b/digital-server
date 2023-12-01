const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      unique: true,
    },

    label: {
      type: String,
    },
  }
);

const WardModel = mongoose.model("wards", wardSchema);
module.exports =  WardModel;
