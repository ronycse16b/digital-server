import mongoose from "mongoose";

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
export default villageModel;
