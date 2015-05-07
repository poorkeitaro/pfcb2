'use strict';

var _ = require('lodash');
var Feat = require('./feat.model');

// Get list of feats
exports.index = function(req, res) {
  Feat.find(function (err, feats) {
    if(err) { return handleError(res, err); }
    return res.json(200, feats);
  });
};

// Get a single feat
exports.show = function(req, res) {
  Feat.find({"id": req.params.id}, function (err, feat) {
    if(err) { return handleError(res, err); }
    if(!feat) { return res.send(404); }
    return res.json(feat);
  });
};

// Creates a new feat in the DB.
exports.create = function(req, res) {
  Feat.create(req.body, function(err, feat) {
    if(err) { return handleError(res, err); }
    return res.json(201, feat);
  });
};

// Updates an existing feat in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Feat.findById(req.params.id, function (err, feat) {
    if (err) { return handleError(res, err); }
    if(!feat) { return res.send(404); }
    var updated = _.merge(feat, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, feat);
    });
  });
};

// Deletes a feat from the DB.
exports.destroy = function(req, res) {
  Feat.findById(req.params.id, function (err, feat) {
    if(err) { return handleError(res, err); }
    if(!feat) { return res.send(404); }
    feat.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  // return err;
  return res.send(500, err);
}