const mongoose = require("mongoose");

const databaseConnect = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://digital-union-database:LkMOOiAmc6hntQNI@cluster0.hj4avpy.mongodb.net/digital-union-database"
    );
    if (conn.connection.host) {
      console.log("Database connection successfully established");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports =  databaseConnect;
