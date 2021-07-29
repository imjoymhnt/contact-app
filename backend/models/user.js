const mongosse = require("mongoose");

const UserSchema = new mongosse.Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
    maxlength: [30, "Max length of name should  30"],
  },
  phone: {
    type: String,
    required: true,
    maxlength: [15, "Max length of phone number should be 15"],
  },
  email: {
    type: String,
    required: true,
  },
  hobbies: {
    type: String,
    required: true,
  },
});

module.exports = mongosse.model("User", UserSchema);
