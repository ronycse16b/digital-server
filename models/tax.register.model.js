const mongoose = require("mongoose");

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
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    villageName: {
      type: String,
      required: true,
    },
    cor: {
      type: Number,
    },
    total: {
      type: Number,
    },
    year: [],

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
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Replace 'User' with the actual name of your user model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TaxModel = mongoose.model("tax-pay", taxSchema);

module.exports = TaxModel;
