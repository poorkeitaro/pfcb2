'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FeatSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Feat', FeatSchema);