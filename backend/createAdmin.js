const mongoose = require('mongoose');
const User = require('./src/models/userModel'); 
require('dotenv').config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminUser = new User({
      username: 'adminuser',           
      email: 'admin@example.com',      
      password: 'password123',    
      role: 'admin'
    });

    await adminUser.save();
    console.log('Admin user created:', adminUser);
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
