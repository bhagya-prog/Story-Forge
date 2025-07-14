const mongoose = require('mongoose');

const localeSchema = new mongoose.Schema({
  key: { 
    type: String, 
    required: true,
    unique: true,
    index: true 
  },
  en: { 
    type: String, 
    required: true 
  },
  es: String,
  fr: String,
  de: String,
  ja: String,
  zh: String,
  hi: String
}, { timestamps: true });

module.exports = mongoose.model('Locale', localeSchema);
