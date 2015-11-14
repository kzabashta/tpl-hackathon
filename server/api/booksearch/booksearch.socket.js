/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Booksearch = require('./booksearch.model');

exports.register = function(socket) {
  Booksearch.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Booksearch.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('booksearch:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('booksearch:remove', doc);
}