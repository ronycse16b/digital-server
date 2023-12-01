const mongoose = require('mongoose');

const wardDataSchema = new mongoose.Schema(
  {
    birthRegNumber: {
      type: Number,
      default:""
    },
    union: {
      type: String,
      default:"৮নং লাকসাম পূর্ব ইউনিয়ন পরিষদ"
    },
    cor: {
      type: Number,
      
    },
    dateOfBirth: {
      type: Date,
      
    },
    fatherName: {
      type: String,
      
    },
    female: {
      type: Number,
      
    },
    holding: {
      type: Number,
      
    },
    house: {
      type: String,
      
    },
    houseName: {
      type: String,
    
    },
    male: {
      type: Number,
      
    },
    marriedStatus: {
      type: String,
      
    },
    mobile: {
      type: Number,
      
    },
    due: {
      type: Number,
      default: 0,
      
    },
    motherName: {
      type: String,
      
    },
    name: {
      type: String,
      
    },
    nidNumber: {
      type: Number,
      default:""
    },
    profession: {
      type: String,
      
    },
    villageName: {
      type: String,
      
    },
    qrCode:{
        type:String,
    },
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wards", // Referencing the 'wards' collection
      required: true,
    },
    yearMullayon: {
      type: Number,
      
    },
    checkbox: [],
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Referencing the 'users' collection
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const WardDataModel = mongoose.model("ward-data", wardDataSchema);
module.exports = WardDataModel;
