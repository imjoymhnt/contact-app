const User = require("../models/user");

exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  if (!user) {
    return res.status(400).json({
      msg: "Cannot create User",
    });
  } else {
    return res.status(201).json({
      data: user,
    });
  }
};

exports.getUsers = async (req, res) => {
  const users = User.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        msg: "Can't get all the users",
      });
    }
    res.status(200).json(data);
  });
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  //   console.log(id);

  if (!user) {
    return res.status(404).json({
      msg: "Can't get user",
    });
  }
  res.status(200).json({
    data: user,
  });
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(400).json({
      msg: "no User found",
    });
  }
  res.status(200).json({
    data: user,
  });
};

// change this
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        msg: "Can't delete user",
      });
    } else {
      res.status(200).json({ msg: "Deleted Successfully" });
    }
  });
};
