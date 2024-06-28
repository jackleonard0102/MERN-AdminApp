// controllers/user.js
const User = require("../models/userModel");
const { delFile } = require("../utils/helpers");
const { _log, _error } = require("../utils/logging");

exports.getUsers = async (req, res) => {
  try {
    let { page, limit, name, email, utm_source, utm_campaign } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const where = {};
    if (name) where.name = new RegExp(name, "i");
    if (email) where.email = new RegExp(email, "i");

    const total = await User.countDocuments(where);
    const users = await User.find(where)
      .select({ password: 0 })
      .skip(skip)
      .limit(limit);

    return res.json({ success: true, users, total });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, permission } = req.body;
    let permissionValue;

    // Check permission value and assign accordingly
    if (permission == 2) {
      permissionValue = 2;
    } else if (permission == 3) {
      permissionValue = 3;
    } else if (permission == 4) {
      permissionValue = 4;
    } else {
      return res.status(400).json({ success: false, message: 'Invalid permission value' });
    }

    // Create new user instance with the mapped permission value
    const user = new User({
      name,
      email,
      password,
      permission: permissionValue,
      logo: req.file?.path
    });

    // Save user to the database
    await user.save();
    return res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = { ...req.body };

    // Map permission field if present
    if (updateData.permission) {
      const permission = updateData.permission.toLowerCase();
      if (permission == 2) {
        updateData.permission = 2;
      } else if (permission == 3) {
        updateData.permission = 3;
      } else if (permission == 4) {
        updateData.permission = 4;
      } else {
        return res.status(400).json({ success: false, message: 'Invalid permission value' });
      }
    }

    // Update logo path if file is present
    if (req.file) {
      updateData.logo = req.file.path.replace(/\\/g, '/').replace('public/', '/');
    }

    // Update user details in the database
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    // Assuming you have a User model and a method to update the status
    await User.findByIdAndUpdate(userId, { status });

    res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ message: 'Error updating user status', error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const existUser = await User.findOne({ email, _id: { $ne: req.user._id } });
    if (existUser) {
      return res.status(422).json({
        success: false,
        errors: { email: "This email has already been taken." },
      });
    }
    const user = await User.findByIdAndUpdate(req.user._id, { name, email }, { new: true });
    return res.json({ success: true, user });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const isValid = await req.user.isValidPassword(oldPassword);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        errors: { oldPassword: "This password is invalid." },
      });
    }
    req.user.password = newPassword;
    await req.user.save();
    return res.json({ success: true });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const isValid = await req.user.isValidPassword(password);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        errors: { password: "This password is invalid." },
      });
    }
    req.user.status = 2;
    await req.user.save();
    return res.json({ success: true });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.upload = async (req, res) => {
  try {
    const file = req.file;
    const oldFile = req.body.oldFile;
    if (oldFile) delFile(`public${oldFile}`);
    req.user.logo = file.path.replace(/\\/g, '/').replace('public/', '/');
    await req.user.save();
    return res.json({
      success: true,
      path: file.path.replace(/\\/g, '/').replace('public/', '/'),
      filename: file.originalname,
    });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
      logo: req.user.logo,
      isAdmin: req.user.permission == 1,
    };
    return res.json({ success: true, user });
  } catch (error) {
    _error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
