const mongoose = require('mongoose');

const villageSchema = new mongoose.Schema(
  {
    ward_no: {
      type: String,
      
    },
    name: {
      type: String,
    },
  }
);

const villageModel = mongoose.model("village-name", villageSchema);
module.exports =  villageModel;
