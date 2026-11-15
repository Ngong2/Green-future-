// scripts/createAdmin.js
// Create the Super Administrator for Green Future and Sustainability Initiative

require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const mongoose = require('mongoose');
const User = require('../models/User');

const createAdmin = async () => {
  try {
    console.log('\n======================================');
    console.log(' GREEN FUTURE & SUSTAINABILITY INITIATIVE');
    console.log(' ADMIN ACCOUNT SETUP');
    console.log('======================================\n');

    // Validate environment variables
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from your .env file.');
    }

    if (!process.env.ADMIN_PASSWORD) {
      throw new Error('ADMIN_PASSWORD is missing from your .env file.');
    }

    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);

    console.log('SUCCESS: Connected to MongoDB Atlas.');

    const adminData = {
      name: 'Green Future and Sustainability Initiative',
      email: 'greenfuturesustainblityinitiative@gmail.com',
      password: process.env.ADMIN_PASSWORD,
      role: 'superadmin'
    };

    // Check for an existing administrator
    const existingAdmin = await User.findOne({
      email: adminData.email
    });

    if (existingAdmin) {
      console.log('\nNOTICE: Administrator account already exists.');
      console.log('Email:', adminData.email);
      return;
    }

    // Create administrator account
    const admin = await User.create(adminData);

    console.log('\nSUCCESS: Super Administrator created!');
    console.log('--------------------------------------');
    console.log('Organization:', adminData.name);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);
    console.log('--------------------------------------');
    console.log('You can now log in through your website.');

  } catch (error) {
    console.error('\nADMIN SETUP FAILED:', error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('\nMongoDB connection closed.');
    }
  }
};

createAdmin();