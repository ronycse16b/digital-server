import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    union: {
      type: String,
      default: "৮নং লাকসাম পূর্ব ইউনিয়ন পরিষদ",
    },
    holding: {
      type: Number,
      required: true,
    },
    fatherName: {
      type: String,
      
    },
    motherName: {
      type: String,
      
    },
    villageName: {
      type: String,
      
    },
    cor: {
      type: Number,
    },
    total: {
      type: Number,
    },
    year: [],
    amount: [],

    houseName: {
      type: String,
    },
    nidNumber: {
      type: String,
    },
    birthRegNumber: {
      type: String,
    },

    qr: {
      type: String,
    },

    mobile: {
      type: Number,
    },
    sn: {
      type: Number,
    },
    due: {
      type: Number,
    },
    ward: {
      type: Number,
      required: true,
    },
    user: {
     type:String
    },
  },
  {
    timestamps: true,
  }
);

const TaxModel = mongoose.model("tax-pay", taxSchema);

export default TaxModel;
