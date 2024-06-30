// seedAdmin.js
const UserModel = require('./userModel');

const seedAdmin = async () => {
  try {
    const existingAdmin = await UserModel.findOne({ email: 'superadmin@test.com' });
    if (!existingAdmin) {
      const admin = new UserModel({
        name: 'superadmin',
        email: 'superadmin@test.com',
        password: 'superadmin',
        permission: 1, // Assuming 1 is for admin
      });
      await admin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

module.exports = seedAdmin;
