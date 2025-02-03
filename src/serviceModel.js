const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  gender: { type: String, required: true }, // 'Male' or 'Female'
  name: { type: String, required: true },   // Service name
  minPrice: { type: Number, required: true }, // Minimum price
  maxPrice: { type: Number, required: true }  // Maximum price
});

const Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
