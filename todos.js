'use strict';

const uuid = require('uuid'),
      moment = require('moment'),
      streamName = `${process.env.STAGE}-todos`;

module.exports.create = (stream, item, callback) => {
  item.id = uuid.v1();
  item.updatedUtc = moment().utc().toISOString();

  const params = {
    StreamName: streamName,
    PartitionKey: uuid.v1(),
    Data: JSON.stringify({ method: 'CREATE', item: item })
  };

  return stream.putRecord(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, item);
    }
  });
};

module.exports.update = (stream, id, item, callback) => {
  item.id = id;
  item.updatedAt = moment().utc().toISOString();

  const params = {
    StreamName: streamName,
    PartitionKey: uuid.v1(),
    Data: JSON.stringify({ method: 'UPDATE', item: item })
  };

  return stream.putRecord(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, item);
    }
  });
};

module.exports.delete = (stream, id, callback) => {
  const item = { id: id };

  const params = {
    StreamName: streamName,
    PartitionKey: uuid.v1(),
    Data: JSON.stringify({ method: 'DELETE', item: item })
  };

  return stream.putRecord(params, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(err, item);
    }
  });
};
