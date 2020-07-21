const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( (err, id) => {
    // fs write file to our\ data in datastore directory
    fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => { //i.e. ./datastore/data/000001.txt
      if (err) {
        throw ('error creating todo');
      } else {
        callback(null, { id, text });
        // { id, text });
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
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      // callback(null, []);
      console.log('error');
    } else {
      console.log(files, "files");
      // callback(null, ({id, id}));
      // callback(null, [].push(id));
    }
  });
};

//datadir, foreach, map, putting {}, push

// {id: '00001', text: '00001'},
// { id: [ '00001.txt', '00002.txt' ] }

// exports.readAll = (callback) => {
//   fs.readdir(exports.dataDir, (err, id) => {
//     if (err) {
//       callback(null, []);
//     } else {
//       callback(null, [].push(id) _.map(exports.dataDir, (id) => {
//         return id;
//         console.log(exports.dataDir, "exports data dir");
//         console.log(id, "id");
//       }));
//     }
//   });
//   // var data = _.map(items, (text, id) => {
//   //   return { id, text };
//   // });
//   // callback(null, []); //data);
// };

exports.readOne = (id, callback) => {
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {id, text});
    }
  });
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

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
