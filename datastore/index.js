const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( (err, id) => {
    // fs write file to our\ data in datastore directory
    fs.writeFile(`./datastore/data/${id}.txt`, text, (err) => {
      if (err) {
        // callback(new Error(`No item with id: ${id}`));
      } else {
        callback(null, { id, text });
      }
    });
    //they look like 000001.txt, which should contain text
    //if error in writing process, give error
    //else, write the text into the file (give it callback on line 18)
  });
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

//delete file
// exports.create = (text, callback) => {
//   counter.getNextUniqueId( (err, id) => {
//     // fs write file to our\ data in datastore directory
//     fs.writeFile(`./datastore/data/${id}.txt`, text, (err) => {
//       if (err) {
//         callback(new Error(`No item with id: ${id}`));
//       } else {
//         callback(null, { id, text });
//       }
//     });
//     //they look like 000001.txt, which should contain text
//     //if error in writing process, give error
//     //else, write the text into the file (give it callback on line 18)
//   });
//   // items[id] = text;
//   // callback(null, { id, text });
// };

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
