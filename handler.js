'use strict';

const AWS = require('aws-sdk'),
      kinesis = new AWS.Kinesis(),
      env = require('dotenv').config(),
      todos = require('./todos.js');

const createResponse = (statusCode, body) => (
  {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(body),
  }
);

module.exports.todosCreate = (event, context, callback) => {
  const item = JSON.parse(event.body);

  todos.create(kinesis, item, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    } else {
      callback(null, createResponse(201, result));
    }
  });
};

module.exports.todosUpdate = (event, context, callback) => {
  const id = event.pathParameters.id,
        item = JSON.parse(event.body);

  todos.update(kinesis, id, item, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    } else {
      callback(null, createResponse(200, result));
    }
  });
};

module.exports.todosDelete = (event, context, callback) => {
  const id = event.pathParameters.id;

  todos.delete(kinesis, id, (err, result) => {
    if (err) {
      callback(createResponse(500, { message: err.message }));
    } else {
      callback(null, createResponse(204));
    }
  });
};
