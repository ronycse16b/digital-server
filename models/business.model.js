import mongoose from "mongoose";

// Define the Mongoose Schema
const businessSchema = new mongoose.Schema({
  formNo: String,
  marketName: String,
  wardNo: String,
  ownerName: String,
  parentName: String,
  voterId: String,
  birthDate: Date,
  permanentAddress: String,
  religion: String,
  mobileNo: String,
  institutionName: String,
  type: String,
  institutionNo: String,
  dimensions: String,
  arrearFee: String,
  tradeLicenseNo: String,
  businessCapital: String
}, 
{
timestamps: true,
}

);

// Create the Mongoose Model
const Business = mongoose.model('Business', businessSchema);

export default Business;
