// database connection file to MongoDB
import { mongoose } from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
     console.log("Connected to database");
 } catch (error) {
     console.log(error.message);
 }
}

export default connectDB
