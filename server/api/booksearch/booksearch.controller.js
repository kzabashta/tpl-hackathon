'use strict';

var _ = require('lodash');
var http = require("http");
var parseString = require('xml2js').parseString;
var Booksearch = require('./booksearch.model');

// Get list of booksearchs
exports.index = function(req, res) {
  Booksearch.find(function (err, booksearchs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(booksearchs);
  });
};

// Get a single booksearch
exports.show = function(req, res) {
  var bookSearchQ = req.params.id;
  var bookSearchUrl = "http://www.goodreads.com/search.xml?key=fggZdz3CMtOIeVjmQ6Gvw&q=" + bookSearchQ;
  http.get(bookSearchUrl, function(_res) {
  var body = '';
    _res.on('data', function(chunk) {
      body += chunk;
    });
    _res.on('end', function() {
      parseString(body, function (err, result) {
          return res.json(result.GoodreadsResponse.search[0].results[0].work);
      });
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

// Get a single booksearch
exports.specific = function(req, res) {
  var id = req.params.id;
  var bookSearchUrl = "http://www.goodreads.com/book/show/" + id + "?format=xml&key=fggZdz3CMtOIeVjmQ6Gvw";
  http.get(bookSearchUrl, function(_res) {
  var body = '';
    _res.on('data', function(chunk) {
      body += chunk;
    });
    _res.on('end', function() {
      parseString(body, function (err, result) {
          return res.json(result.GoodreadsResponse.book[0]);
      });
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};

// Creates a new booksearch in the DB.
exports.create = function(req, res) {
  Booksearch.create(req.body, function(err, booksearch) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(booksearch);
  });
};

// Updates an existing booksearch in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Booksearch.findById(req.params.id, function (err, booksearch) {
    if (err) { return handleError(res, err); }
    if(!booksearch) { return res.status(404).send('Not Found'); }
    var updated = _.merge(booksearch, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(booksearch);
    });
  });
};

// Deletes a booksearch from the DB.
exports.destroy = function(req, res) {
  Booksearch.findById(req.params.id, function (err, booksearch) {
    if(err) { return handleError(res, err); }
    if(!booksearch) { return res.status(404).send('Not Found'); }
    booksearch.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}