// this file handles local data based on language

const Locale = require('../models/localeModel');

exports.getLocale = async (req, res, next) => {
  try {
    const locales = await Locale.find();
    const result = {};
    locales.forEach(locale => {
      result[locale.key] = locale[req.query.lang || 'en'] || locale.en;
    });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
