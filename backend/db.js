const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  console.log(`MongoDB connected with ${connection.connection.host}`);
};

module.exports = connectDB;
